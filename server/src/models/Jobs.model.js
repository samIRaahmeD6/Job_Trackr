import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    jobLink: {
      type: String,
      trim: true,
    },

    source: {
      type: String,
      trim: true,
    },

    salaryMin: {
      type: Number,
    },

    salaryMax: {
      type: Number,
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Applied", "Interview", "TechnicalExam","Rejected", "Offer"],
      default: "Applied",
    },

    followUp: {
      type: Number,
    },
    location: {
      type: String,
      trim: true,
    },
    offerDeadline: { type: Date, default: null },

    timeline: [
    {
      stage: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
    jobdescription: {
      type: String,
      trim: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    favorite: {
      type: Boolean,
      default: false,
   },
   requiredSkills: { 
    type: [String], default: []
   },

   missingSkills: {
     type: [String], default: []
     },
   skillsAnalyzedAt: { type: Date, default: null 

   },
  },
  { timestamps: true }
);

// index for fast queries
jobSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Job", jobSchema);