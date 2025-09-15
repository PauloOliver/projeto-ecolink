// src/services/api.ts
import axios, { AxiosInstance, AxiosHeaders, InternalAxiosRequestConfig } from "axios";

const baseURL = (import.meta as any).env?.VITE_API_URL ?? "http://localhost:3000/api/v1";
const api: AxiosInstance = axios.create({ baseURL });

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
  }
  return config;
});

export default api;
