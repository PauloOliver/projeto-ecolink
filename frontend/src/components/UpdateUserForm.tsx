// src/components/UpdateUserForm.tsx
import { useState } from "react";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { getCurrentUser } from "../services/auth";
import backIcon from "../assets/icon_voltar.png";

export default function UpdateUserForm() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErro("Usuário não autenticado");
        return;
      }

      // Faz update no backend
      const { data: updated } = await api.put(
        "/usuarios",
        { nome_usuarios: nome, senha },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Atualiza o user do localStorage
      const current = getCurrentUser();
      const newUser = {
        ...current,
        nome_usuarios: updated.nome_usuarios ?? nome,
        email: current?.email,
      };
      localStorage.setItem("user", JSON.stringify(newUser));

      // Notifica Navbar
      window.dispatchEvent(new Event("auth-changed"));

      setSucesso(true);

      // redirecionar depois de 2s
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err: any) {
      setErro(err?.response?.data?.error ?? "Erro ao atualizar usuário");
    }
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[url('./assets/img-fundo.png')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-green-900/30" />

      <div className="relative min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-center text-green-700 mb-6" style={{color: "#47D7AC"}}>
            Atualizar Usuário
          </h1>

          {sucesso && (
            <Toast>
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-500">
                ✅
              </div>
              <div className="ml-3 text-sm font-normal">
                Usuário atualizado com sucesso!
              </div>
              <button
                onClick={() => setSucesso(false)}
                className="ml-2 text-sm text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
            </Toast>
          )}

          {erro && <p className="text-red-600 text-sm mb-3">{erro}</p>}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name1" style={{ color: "#11111F" }}>
                  Nome
                </Label>
              </div>
              <TextInput
                id="name1"
                type="text"
                placeholder="Novo nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" style={{ color: "#11111F" }}>
                  Nova senha
                </Label>
              </div>
              <TextInput
                id="password1"
                type="password"
                placeholder="*****"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <Button type="submit" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-sky-400 to-emerald-600 
                hover:opacity-90 focus:ring-4 focus:ring-sky-300 dark:focus:ring-emerald-900">
              Confirmar
            </Button>
          </form>

          <Link to="/profile">
            <Button
              className="p-2 bg-white rounded-full shadow-md hover:opacity-90 focus:ring-2 focus:ring-sky-300 mt-5  "
            >
              <img src={backIcon} alt="Voltar" className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
