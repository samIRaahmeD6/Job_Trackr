import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,

    email: { type: String, required: true, unique: true },

    passwordHash: { type: String, required: true },

    role: {
      type: String,
      enum: ["student",
          "junior developer",
          "mid level developer",
          "senior developer",
          "career switcher"],
          required: true,
    },

    avatarInitials: String,

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);