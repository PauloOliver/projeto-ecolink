import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { register } from "../services/auth";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);

    if (senha !== confirmSenha) {
      setErro("As senhas não conferem");
      return;
    }

    try {
      setLoading(true);
      await register(nome, email, senha);
      alert("Usuário registrado com sucesso!");
      navigate("/login"); // redireciona para login
    } catch (err: any) {
      setErro(err?.response?.data?.error ?? "Falha no registro");
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
          <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
            Registrar
          </h1>

          {erro && <p className="text-red-600 text-sm mb-2">{erro}</p>}

          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <Label htmlFor="name1" style={{ color: "#047857" }}>
                Nome
              </Label>
              <TextInput
                id="name1"
                type="text"
                placeholder="John Doe"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="email1" style={{ color: "#047857" }}>
                Email
              </Label>
              <TextInput
                id="email1"
                type="email"
                placeholder="exemplo@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password1" style={{ color: "#047857" }}>
                Senha
              </Label>
              <TextInput
                id="password1"
                type="password"
                placeholder="*****"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password2" style={{ color: "#047857" }}>
                Confirmação de senha
              </Label>
              <TextInput
                id="password2"
                type="password"
                placeholder="*****"
                required
                value={confirmSenha}
                onChange={(e) => setConfirmSenha(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Confirmar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
