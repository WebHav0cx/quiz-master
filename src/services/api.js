import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach auth token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    console.error("API Error:", message);
    return Promise.reject(error);
  }
);

// ---------- API DOMAINS ---------- //
export const authAPI = {
  login: (provider, data) => api.post(`/auth/${provider}`, data),
  logout: () => api.post("/auth/logout"),
  getProfile: () => api.get("/auth/profile"),
};

export const subjectAPI = {
  getAll: () => api.get("/subjects"),
  getById: (id) => api.get(`/subjects/${id}`),
  create: (payload) => api.post("/subjects", payload),
  update: (id, payload) => api.put(`/subjects/${id}`, payload),
  delete: (id) => api.delete(`/subjects/${id}`),
};

export const quizAPI = {
  getQuizBySubject: (subjectId) => api.get(`/quiz/${subjectId}`),
  submitQuiz: (quizId, answers) =>
    api.post(`/quiz/${quizId}/submit`, { answers }),
  getResults: (resultId) => api.get(`/quiz/results/${resultId}`),
};

export const adminAPI = {
  getUsers: () => api.get("/admin/users"),
  updateUserRole: (userId, role) =>
    api.put(`/admin/users/${userId}/role`, { role }),
  getQuestions: (subjectId) =>
    api.get(`/admin/subjects/${subjectId}/questions`),
  createQuestion: (subjectId, data) =>
    api.post(`/admin/subjects/${subjectId}/questions`, data),
  updateQuestion: (questionId, data) =>
    api.put(`/admin/questions/${questionId}`, data),
  deleteQuestion: (questionId) => api.delete(`/admin/questions/${questionId}`),
};

export default api;
