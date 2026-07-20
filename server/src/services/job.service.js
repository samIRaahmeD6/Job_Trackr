import Job from "../models/Jobs.model.js";

export const createJob = async (data, userId) => {
  const job = await Job.create({
    ...data,
    user: userId,
    timeline: [
      {
        stage: "Applied",
        date: new Date(),
      },
    ],
  });

  return job;
};