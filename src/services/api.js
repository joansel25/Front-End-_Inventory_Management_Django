import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // Tu backend Django local

// Crear instancia base de Axios
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor: si hay token, lo agrega a los headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;