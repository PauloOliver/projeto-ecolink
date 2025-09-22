import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DeleteUserForm() {
  return (
    <div className="relative min-h-screen">
      
      <div className="absolute inset-0 bg-[url('./assets/img-fundo.png')] bg-cover bg-center bg-no-repeat" />
    
      <div className="absolute inset-0 bg-green-900/30" />

     
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-center text-green-700 mb-6">Delete</h1>
          <form className="flex flex-col gap-4">

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" style={{ color: "#047857" }}>Senha</Label>
              </div>
              <TextInput id="password1" type="password" placeholder="*****" required />
            </div>

            <Button type="submit" className="bg-green-600 hover:bg-green-700">Confirmar</Button>
          </form>
          <Link to="/profile">
              <Button type="submit" className="m-5 bg-green-600 hover:bg-green-700">Voltar</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
