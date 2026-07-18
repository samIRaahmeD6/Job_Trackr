import api from "./api";

export const getSkillGaps = async () => {
  const { data } = await api.get("/skill-gaps");
  return data.data;
};

export const getLearningRoadmap = async () => {
  const { data } = await api.get("/skill-gaps/roadmap");
  return data.data;
};