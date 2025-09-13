import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export function LoginPage() {
  return (
    <div className="relative min-h-screen">
      
      <div className="absolute inset-0 bg-[url('./assets/img-fundo.png')] bg-cover bg-center bg-no-repeat" />
    
      <div className="absolute inset-0 bg-green-900/30" />

     
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-center text-green-700 mb-6">Login</h1>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" style={{ color: "#047857" }}>Your email</Label>
              </div>
              <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" style={{ color: "#047857" }}>Your password</Label>
              </div>
              <TextInput id="password1" type="password" required />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" style={{ color: "#047857" }}>Remember me</Label>
            </div>

            <Button type="submit" className="bg-green-600 hover:bg-green-700">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
