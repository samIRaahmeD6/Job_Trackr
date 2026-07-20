import * as skillGapService from "../services/skillGap.service.js";

export const getSkillGaps = async (req, res) => {
  try {
    const topGaps = await skillGapService.getSkillGapSummary(req.user._id);
    res.status(200).json({ data: topGaps.slice(0, 10) });
  } catch (err) {
    console.error("Skill gap fetch error:", err);
    res.status(500).json({ message: "Failed to fetch skill gaps" });
  }
};

export const getRoadmap = async (req, res) => {
  try {
    const roadmap = await skillGapService.getLearningRoadmap(req.user._id);
    res.status(200).json({ data: roadmap });
  } catch (err) {
    console.error("Roadmap fetch error:", err);
    res.status(500).json({ message: "Failed to generate learning roadmap" });
  }
};