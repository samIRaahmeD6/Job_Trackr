import Job from "../models/Jobs.model.js";
import { getSkillGapSummary } from "./skillGap.service.js";

const ADVANCED_STAGES = ["Interview", "TechnicalExam", "Offer"];

const categorizeRole = (position = "") => {
  const p = position.toLowerCase();
  if (/front.?end|react|vue|angular/.test(p)) return "Frontend";
  if (/back.?end|node|django|spring/.test(p)) return "Backend";
  if (/full.?stack/.test(p)) return "Full Stack";
  if (/flutter|android|\bios\b|mobile/.test(p)) return "Mobile";
  if (/data|machine learning|\bml\b|\bai\b/.test(p)) return "Data/ML";
  if (/devops|cloud|infra/.test(p)) return "DevOps";
  return "Other";
};

const wasAdvanced = (job) => {
  if (ADVANCED_STAGES.includes(job.status)) return true;
  return (job.timeline || []).some((t) => ADVANCED_STAGES.includes(t.stage));
};

// Insight 1: category with highest interview rate (min 2 applications to avoid noise)
const getInterviewRateInsight = async (userId) => {
  const jobs = await Job.find({ user: userId, isDeleted: false });
  const byCategory = {};

  jobs.forEach((job) => {
    const cat = categorizeRole(job.position);
    if (!byCategory[cat]) byCategory[cat] = { total: 0, advanced: 0 };
    byCategory[cat].total += 1;
    if (wasAdvanced(job)) byCategory[cat].advanced += 1;
  });

  let best = null;
  Object.entries(byCategory).forEach(([category, stats]) => {
    if (stats.total < 2) return;
    const rate = (stats.advanced / stats.total) * 100;
    if (!best || rate > best.rate) best = { category, rate };
  });

  if (!best || best.rate === 0) return null;

  return {
    color: "#97C459",
    boldText: `${best.category} roles`,
    text: `have your highest interview rate at ${Math.round(best.rate)}%.`,
  };
};

// Insight 2: top skill gap(s) from rejections
const getSkillGapInsight = async (userId) => {
  const gaps = await getSkillGapSummary(userId);
  if (!gaps.length) return null;

  const top = gaps[0];
  const tied = gaps.filter((g) => g.jobCount === top.jobCount).slice(0, 2);
  const names = tied.map((g) => g.skill).join(" & ");

  return {
    color: "#EF9F27",
    boldText: names,
    text: `appear in ${top.jobCount} job${top.jobCount !== 1 ? "s" : ""} where you were rejected.`,
  };
};

// Insight 3: overdue follow-ups
const getFollowUpInsight = async (userId) => {
  const now = new Date();
  const jobs = await Job.find({ user: userId, status: "Applied", isDeleted: false });

  const overdueCount = jobs.filter((job) => {
    const appliedDate = new Date(job.appliedDate);
    const dueDate = new Date(appliedDate);
    dueDate.setDate(dueDate.getDate() + (job.followUp || 7));
    return now > dueDate;
  }).length;

  if (overdueCount === 0) return null;

  return {
    color: "#E24B4A",
    boldText: `${overdueCount} application${overdueCount !== 1 ? "s" : ""}`,
    text: `have had no follow-up in over 7 days.`,
  };
};

// Insight 4: nearest expiring offer (within 7 days)
const getOfferInsight = async (userId) => {
  const now = new Date();
  const sevenDaysOut = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const offers = await Job.find({
    user: userId,
    status: "Offer",
    isDeleted: false,
    offerDeadline: { $ne: null, $gte: now, $lte: sevenDaysOut },
  }).sort({ offerDeadline: 1 });

  if (!offers.length) return null;

  const job = offers[0];
  const daysLeft = Math.ceil((new Date(job.offerDeadline) - now) / (24 * 60 * 60 * 1000));

  return {
    color: "#378ADD",
    boldText: job.companyName,
    text: `offer expires in ${daysLeft} day${daysLeft !== 1 ? "s" : ""} — consider responding.`,
  };
};

export const getSmartInsights = async (userId) => {
  const results = await Promise.all([
    getInterviewRateInsight(userId),
    getSkillGapInsight(userId),
    getFollowUpInsight(userId),
    getOfferInsight(userId),
  ]);

  return results.filter(Boolean);
};