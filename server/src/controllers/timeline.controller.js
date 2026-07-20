import Job from "../models/Jobs.model.js"

export const getTimelineJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      user: req.user._id,
      isDeleted: false,
    }).sort({ updatedAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};