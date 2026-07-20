import express from "express";
import protect from "../middleware/auth.middleware.js"; // default import, no curly braces
import { getSkillGaps, getRoadmap } from "../controllers/skillGap.controller.js";

const router = express.Router();

router.get("/", protect, getSkillGaps);
router.get("/roadmap", protect, getRoadmap);

export default router;