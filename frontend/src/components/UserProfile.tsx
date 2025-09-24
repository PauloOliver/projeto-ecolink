// src/components/UserProfile.tsx
import { Avatar, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser,type User } from "../services/auth";
import foto_profile from "../assets/foto_profile.png"

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[url('./assets/img-fundo.png')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-green-900/30" />

      <div className="relative min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur rounded-2xl shadow-lg">
          <div className="flex flex-col items-center text-center">
            <Avatar
              img={user?.foto ?? foto_profile}
              rounded
              size="xl"
            />
            <h2 className="mt-4 text-2xl font-bold text-green-700" style={{color: "#47D7AC"}}>
              {user?.nome_usuarios ?? "Usuário"}
            </h2>
            <p className="text-gray-600">Perfil EcoLink</p>
          </div>

          <div className="mt-6 space-y-3 text-gray-800">
            <div className="flex justify-between">
              <span className="font-medium text-green-700" style={{ color: "#11111F"}}>Email:</span>
              <span>{user?.email ?? "—"}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <Link to="/update">
              <Button className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg 
                bg-gradient-to-r from-sky-400 to-emerald-600 
                hover:opacity-90 focus:ring-4 focus:ring-sky-300 dark:focus:ring-emerald-900">
                Editar Perfil
              </Button>
            </Link>
            <Link to="/delete">
              <Button className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg 
                bg-gradient-to-r from-sky-400 to-emerald-600 
                hover:opacity-90 focus:ring-4 focus:ring-sky-300 dark:focus:ring-emerald-900">
                Deletar Perfil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
