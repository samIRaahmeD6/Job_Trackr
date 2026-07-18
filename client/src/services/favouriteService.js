import api from "./api";

export const toggleFavorite = async (id) => {
   const response = await api.patch(`/jobs/${id}/favorite`);
   return response.data;
};
export const getFavourites = async() =>{
  const response = await api.get("jobs/favorites");
  return response.data
}