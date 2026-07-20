import express from "express";
import protect from "../middleware/auth.middleware.js";
import { getTimelineJobs } from "../controllers/timeline.controller.js";

const router = express.Router();

router.get("/", protect, getTimelineJobs);

export default router;