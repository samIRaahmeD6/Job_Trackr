import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import timelineRoutes from "./routes/timeline.routes.js"
import jobRoutes from "./routes/job.routes.js"
import resumeRoutes from "./routes/resume.routes.js"
import skillGapRoutes from "./routes/skillGap.routes.js";
import insightsRoutes from "./routes/insights.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api", jobRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/resumes",  resumeRoutes); 
app.use("/api/skill-gaps", skillGapRoutes);
app.use("/api/insights", insightsRoutes);
// middlewares
app.use(notFound);
app.use(errorHandler);

export default app;