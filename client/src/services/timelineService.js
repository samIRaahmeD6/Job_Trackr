import api from "./api";


export const getTimelineJobs = async () => {
  const response = await api.get("/timeline");
  return response.data;
};