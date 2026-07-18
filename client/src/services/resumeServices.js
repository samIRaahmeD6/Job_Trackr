import api from "./api";
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  // ✅ no headers — axios sets Content-Type + boundary automatically
  const { data } = await api.post("/resumes/upload", formData);
  return data.data;
};

export const getActiveResume = async () => {
  try {
    const { data } = await api.get("/resumes/active");
    return data.data;
  } catch (err) {
    // 404 means no resume yet — return null instead of throwing
    if (err?.response?.status === 404) {
      return null;
    }
    throw err; // re-throw anything else (500, network error, etc.)
  }
};

export const getAllResumes = async () => {
  const { data } = await api.get("/resumes");
  return data.data;
};

export const deleteResume = async (id) => {
  const { data } = await api.delete(`/resumes/${id}`);
  return data;
};

export const analyzeJobDescription = async (jobDescription) => {
  const { data } = await api.post("/resumes/analyze-jd", { jobDescription });
  return data.data; // assumes backend wraps response as { data: {...} } — see note below
};

