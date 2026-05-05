import api from "./api";

// CREATE JOB
export const createJob = async (data) => {
  const response = await api.post("/jobs", data);
  return response.data;
};

export const showJobStats = async () => {
  const response = await api.get("/jobs/stats");
  return response.data;
};

export const getJob = async() =>{
  const response = await api.get("jobs");
  return response.data
}