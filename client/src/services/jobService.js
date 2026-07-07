import api from "./api";

// CREATE JOB
export const createJob = async (data) => {
  const response = await api.post("/jobs", data);
  return response.data;
};

// GET ALL JOBS
export const getJob = async () => {
  const response = await api.get("/jobs");
  return response.data;
};

// GET JOB STATS
export const showJobStats = async () => {
  const response = await api.get("/jobs/stats");
  return response.data;
};

// UPDATE JOB STATUS
export const updateJobStatus = async (id, status) => {
  const response = await api.patch(`/jobs/${id}/status`, { status });
  return response.data;
};