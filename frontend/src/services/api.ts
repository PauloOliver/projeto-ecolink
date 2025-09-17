// src/services/api.ts
import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const baseURL = (import.meta as any).env?.VITE_API_URL ?? "http://localhost:3000/api/v1";
const api = axios.create({ baseURL });

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token"); // ou import.meta.env.VITE_DEV_TOKEN
  if (token) {
    // evita usar AxiosHeaders .set(); funciona em qualquer axios v1
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
