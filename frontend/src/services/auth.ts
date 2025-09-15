// src/services/auth.ts
import api from "./api";

export async function login(email: string, senha: string) {
  const { data } = await api.post("/login", { email, senha }); // { user, token }
  localStorage.setItem("token", data.token);         // <- salva o token
  localStorage.setItem("user", JSON.stringify(data.user)); // opcional
  return data.user;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
