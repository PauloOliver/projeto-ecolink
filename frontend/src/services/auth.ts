// src/services/auth.ts
import api from "./api";

// Tipagem do usuário (ajuste se no backend tiver mais campos)
export type User = {
  id_usuarios: number;
  nome_usuarios: string;
  email: string;
  foto?: string | null;
};

// -------------------- REGISTRO --------------------
export async function register(nome: string, email: string, senha: string) {
  const { data } = await api.post("/usuarios", {
    nome_usuarios: nome,
    email,
    senha,
  });
  return data; // retorna o usuário criado
}


// -------------------- LOGIN --------------------
export async function login(email: string, senha: string) {
  const { data } = await api.post("/login", { email, senha });

  // espera que o back retorne { token, user }
  const { token, user } = data;

  // guarda no localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  // dispara evento pra navbar atualizar
  window.dispatchEvent(new Event("auth-changed"));

  return { token, user };
}

// -------------------- LOGOUT --------------------
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("auth-changed")); // avisa Navbar
  
}

// -------------------- GET USER --------------------
export function getCurrentUser(): User | null {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
}

// -------------------- GET TOKEN --------------------
export function getToken(): string | null {
  return localStorage.getItem("token");
}
