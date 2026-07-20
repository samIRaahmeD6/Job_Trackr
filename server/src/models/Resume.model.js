import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    start_date: String,
    end_date: String,
    description: String,
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    institution: String,
    degree: String,
    field: String,
    start_date: String,
    end_date: String,
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    tech_used: [String],
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique:true,
    },
    name: String,
    email: String,
    phone: String,
    linkedin: String,
    github: String,
    summary: String,
    skills: [String],
    experience: [experienceSchema],
    education: [educationSchema],
    certifications: [String],
    projects: [projectSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);