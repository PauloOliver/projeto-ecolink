import { Avatar, Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function UserProfile() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[url('./assets/img-fundo.png')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-green-900/30" />

      <div className="relative min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur rounded-2xl shadow-lg">

          <div className="flex flex-col items-center text-center">
            <Avatar
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
              size="xl"
            />
            <h2 className="mt-4 text-2xl font-bold text-green-700">John Testes</h2>
            <p className="text-gray-600">Desenvolvedor Front-end</p>
          </div>

          <div className="mt-6 space-y-3 text-gray-800">
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Email:</span>
              <span>john@email.com</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <Link to="/update">
              <Button color="green" className="bg-green-600 hover:bg-green-700">
                  Editar Perfil
                </Button>
            </Link>
            <Link to="/delete">
              <Button color="green" className="bg-green-600 hover:bg-green-700">
                Deletar Perfil
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
