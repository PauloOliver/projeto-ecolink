// src/components/DeleteUserForm.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { deleteUser } from "../services/auth"; // função que você criou no backend
import backIcon from "../assets/icon_voltar.png";

export default function DeleteUserForm() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);
    setLoading(true);

    try {
      await deleteUser(senha); // chama backend
      setSucesso(true);

      // aguarda 2s e volta para o login
      setTimeout(() => {
        navigate("/register");
      }, 2000);
    } catch (err: any) {
      setErro(err?.response?.data?.error ?? "Erro ao deletar usuário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[url('./assets/img-fundo.png')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-green-900/30" />

      <div className="relative min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur rounded-2xl shadow-lg">
        
          <h1 className="text-2xl font-bold text-center text-green-700 mb-6" style={{color: "#47D7AC"}}>
            Deletar Conta
          </h1>

          {/* Mensagem de erro */}
          {erro && (
            <p className="mb-4 text-sm text-red-600 text-center">{erro}</p>
          )}

          {/* Toast de sucesso */}
         {sucesso && (
  <Toast>
    <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-500">
      ✅
    </div>
    <div className="ml-3 text-sm font-normal">Usuário deletado com sucesso!</div>
  </Toast>
)}

          {/* Formulário */}
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" style={{ color: "#11111F" }}>
                  Senha
                </Label>
              </div>
              <TextInput
                id="password1"
                type="password"
                placeholder="*****"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-sky-400 to-emerald-600 
                hover:opacity-90 focus:ring-4 focus:ring-sky-300 dark:focus:ring-emerald-900"
              disabled={loading}
            >
              {loading ? "Deletando..." : "Confirmar"}
            </Button>
          </form>
          <Link to="/profile">
            <Button
              className="p-2 bg-white rounded-full shadow-md hover:opacity-90 focus:ring-2 focus:ring-sky-300 mt-5"
            >
              <img src={backIcon} alt="Voltar" className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
