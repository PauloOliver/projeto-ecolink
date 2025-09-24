import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { login, getCurrentUser } from "../services/auth";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<any>(null);

  // Carrega usuário salvo (se já tinha logado antes)
  useEffect(() => {
    const saved = getCurrentUser(); // lê do localStorage
    if (saved) setUsuario(saved);
  }, []);
  

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    try {
      // login chama API, salva token+user no localStorage
      const { user } = await login(email, senha);

      // atualiza estado
      setUsuario(user);

      // dispara evento para atualizar a Navbar
      window.dispatchEvent(new Event("auth-changed"));

      // redirecionar 
      navigate("/");
    } catch (err: any) {
      setErro(err?.response?.data?.error ?? "Falha no login");
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
          <h1 className="text-2xl font-bold text-center text-green-700 mb-6" style={{color: '#47D7AC'}}>
            Login
          </h1>

          {usuario && (
            <div className="mb-4 rounded-md bg-green-50 p-3 text-green-700">
              ✅ Logado como <strong>{usuario.nome_usuarios}</strong> (
              {usuario.email})
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" style={{ color: "#11111F" }}>
                  Email
                </Label>
              </div>
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

            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" style={{ color: "#11111F" }}>
                Lembre-me
              </Label>
            </div>

            {erro && <p className="text-red-600 text-sm">{erro}</p>}

            <Button
              type="submit"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg 
                bg-gradient-to-r from-sky-400 to-emerald-600 
                hover:opacity-90 focus:ring-4 focus:ring-sky-300 dark:focus:ring-emerald-900"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Confirmar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
