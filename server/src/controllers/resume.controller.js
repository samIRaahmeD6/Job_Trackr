import * as resumeService from "../services/resume.service.js";

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const savedResume = await resumeService.parseCV(req.file.buffer, req.user._id); // ← resumeService, not cvService
    res.status(200).json({ success: true, data: savedResume });
  } catch (error) {
    next(error);
  }
};

export const getActiveResume = async (req, res, next) => {
  try {
    const resume = await resumeService.getActiveResume(req.user._id); // ← resumeService
    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getAllResumes = async (req, res, next) => {
  try {
    const resumes = await resumeService.getAllResumes(req.user._id); // ← resumeService
    res.status(200).json({ success: true, data: resumes });
  } catch (error) {
    next(error);
  }
};

export const removeResume = async (req, res, next) => {
  try {
    await resumeService.deleteResume(req.user._id, req.params.id); // ← resumeService
    res.status(200).json({ success: true, message: "Resume deleted" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const analyzeJD = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    if (!jobDescription?.trim()) {
      return res.status(400).json({ message: "Job description is required" });
    }

    const resume = await resumeService.getActiveResume(req.user._id);
    const skills = resume.skills || [];
    const analysis = await resumeService.analyzeJobDescription(skills, jobDescription);

    res.status(200).json({ data: analysis });
  } catch (err) {
    console.error("JD analysis error:", err);
    res.status(err.statusCode || 500).json({ message: err.message || "Failed to analyze job description" });
  }
};