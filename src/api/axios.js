// src/api/axios.js
import axios from "axios";

// آدرس بک‌اند Spring Boot
const api = axios.create({
  baseURL: "http://localhost:31000/api",
});

// اگر توکن در localStorage باشد، روی هر درخواست ست می‌کنیم
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
