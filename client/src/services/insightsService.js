import api from "./api";

export const getSmartInsights = async () => {
  const { data } = await api.get("/insights");
  return data.data;
};