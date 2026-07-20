import Job from "../models/Jobs.model.js";
import { getActiveResume, analyzeJobDescription, generateWithRetry } from "./resume.service.js";

// Called whenever a job's status is set to "Rejected"
export const analyzeRejectedJob = async (jobId, userId) => {
  const job = await Job.findOne({ _id: jobId, user: userId });
  if (!job) return null;

  if (job.skillsAnalyzedAt) return job; // already analyzed, don't waste API calls
  if (!job.jobdescription?.trim()) return job; // nothing to analyze

  let resume;
  try {
    resume = await getActiveResume(userId);
  } catch (err) {
    return job; // no resume uploaded yet — skip silently
  }

  const analysis = await analyzeJobDescription(resume.skills || [], job.jobdescription);

  job.requiredSkills = analysis.requiredSkills || [];
  job.missingSkills = analysis.missingSkills || [];
  job.skillsAnalyzedAt = new Date();
  await job.save();

  return job;
};

// Aggregates missing skills across all rejected jobs, sorted by frequency
export const getSkillGapSummary = async (userId) => {
  const rejectedJobs = await Job.find({
    user: userId,
    status: "Rejected",
    isDeleted: false,
    missingSkills: { $exists: true, $ne: [] },
  });

  const skillCounts = {};
  rejectedJobs.forEach((job) => {
    (job.missingSkills || []).forEach((rawSkill) => {
      const skill = rawSkill.trim();
      if (!skill) return;
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
  });

  return Object.entries(skillCounts)
    .map(([skill, jobCount]) => ({ skill, jobCount }))
    .sort((a, b) => b.jobCount - a.jobCount);
};

// Generates an ordered learning path with time estimates
export const getLearningRoadmap = async (userId) => {
  const topGaps = await getSkillGapSummary(userId);
  if (!topGaps.length) return [];

  const top5 = topGaps.slice(0, 5);

  const prompt = `
A job seeker has these skill gaps, ranked by how many job rejections mention them:

${top5.map((g, i) => `${i + 1}. ${g.skill} — appears in ${g.jobCount} rejected job(s)`).join("\n")}

Create a recommended learning path. Order by priority — put foundational/prerequisite skills first even if they have a lower rejection count.

Return ONLY valid JSON, no markdown, no code fences, in this exact shape:
[
  { "skill": "Redux Toolkit", "rejectionCount": 8, "estimatedTime": "~2 weeks" }
]
`;

  const response = await generateWithRetry("gemini-2.5-flash-lite", prompt);
  const raw = response.text.trim().replace(/```json|```/g, "");
  return JSON.parse(raw);
};