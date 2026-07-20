import express from "express";
import { createJob } from "../controllers/job.controller.js";
import protect from "../middleware/auth.middleware.js";
import { getJobStats } from "../controllers/job.controller.js";
import { getJobs } from "../controllers/job.controller.js";
import { toggleFavorite } from "../controllers/job.controller.js";
import { getFavoriteJobs } from "../controllers/job.controller.js";
import { updateJobStatus } from "../controllers/job.controller.js";
const router = express.Router();

router.post("/jobs", protect, createJob);
router.get("/jobs/stats", protect, getJobStats);
router.get("/jobs", protect, getJobs);
router.patch("/jobs/:id/favorite", protect, toggleFavorite);
router.get("/jobs/favorites", protect, getFavoriteJobs);
router.patch("/jobs/:id/status", protect, updateJobStatus);
export default router;