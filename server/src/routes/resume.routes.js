import express from "express";
import { uploadResume, getActiveResume, getAllResumes, removeResume, analyzeJD } from "../controllers/resume.controller.js";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/upload", protect, upload.single("resume"), uploadResume); // ← field renamed to "resume"
router.get("/active", protect, getActiveResume);
router.get("/", protect, getAllResumes);
router.delete("/:id", protect, removeResume);
router.post("/analyze-jd", protect, analyzeJD);
export default router;