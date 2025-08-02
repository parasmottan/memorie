import axios from "axios";

const API = axios.create({
 baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// 🔑 Inject token dynamically on every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
