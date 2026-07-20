import * as insightsService from "../services/insights.service.js";

export const getInsights = async (req, res) => {
  try {
    const insights = await insightsService.getSmartInsights(req.user._id);
    res.status(200).json({ data: insights });
  } catch (err) {
    console.error("Insights fetch error:", err);
    res.status(500).json({ message: "Failed to fetch insights" });
  }
};