import * as jobService from "../services/job.service.js";
import Job from "../models/Jobs.model.js"
import * as skillGapService from "../services/skillGap.service.js";
export const createJob = async (req, res, next) => {
  try {
    const job = await jobService.createJob(req.body, req.user._id);

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

export const getJobStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // 🔥 1. Status-based stats
    const stats = await Job.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedStats = {
      Applied: 0,
      Interview: 0,
      TechnicalExam: 0,
      Offer: 0,
      Rejected: 0,
    };

    stats.forEach((item) => {
      formattedStats[item._id] = item.count;
    });

    // 📅 2. THIS WEEK APPLIED JOBS
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const thisWeekApplied = await Job.countDocuments({
      user: userId,
      status: "Applied",
      appliedDate: { $gte: startOfWeek },
    });

    // ⚠️ 3. OVERDUE JOBS (NEW)
    const now = new Date();

    const jobs = await Job.find({ user: userId });

    const overdue = jobs.filter((job) => {
      if (job.status !== "Applied") return false;

      const appliedDate = new Date(job.appliedDate);
      const followUpDays = job.followUp || 7;

      const dueDate = new Date(appliedDate);
      dueDate.setDate(dueDate.getDate() + followUpDays);

      return now > dueDate;
    }).length;

    // 📤 4. RESPONSE
    res.status(200).json({
      ...formattedStats,
      thisWeekApplied,
      overdue,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getJobs = async (req, res) => {
  try {
    const userId = req.user._id;

    const jobs = await Job.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleFavorite = async (req, res) => {
   try {
      const job = await Job.findById(req.params.id);

      if (!job) {
         return res.status(404).json({
            message: "Job not found",
         });
      }

      job.favorite = !job.favorite;

      await job.save();

      res.status(200).json(job);

   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};

export const getFavoriteJobs = async (req, res) => {
   try {
      const jobs = await Job.find({
         user: req.user._id,
         favorite: true,
      });

      res.status(200).json(jobs);

   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};

export const updateJobStatus = async (req, res) => {
  try {
    const { status, offerDeadline } = req.body; // accept optional offerDeadline

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.status !== status) {
      job.status = status;
      job.timeline.push({ stage: status, date: new Date() });
    }

    if (status === "Offer" && offerDeadline) {
      job.offerDeadline = new Date(offerDeadline);
    }

    await job.save();

    if (status === "Rejected") {
      skillGapService.analyzeRejectedJob(job._id, req.user._id).catch((err) =>
        console.error("Background skill gap analysis failed:", err)
      );
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};