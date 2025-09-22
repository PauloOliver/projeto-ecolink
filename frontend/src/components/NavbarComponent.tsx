// src/components/NavbarComponent.tsx
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/auth";

export function NavbarComponent() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  // carrega o usuário e escuta login/logout
  useEffect(() => {
    setUser(getCurrentUser());

    const handleAuthChanged = () => setUser(getCurrentUser());
    window.addEventListener("auth-changed", handleAuthChanged);
    window.addEventListener("storage", handleAuthChanged); // outra aba

    return () => {
      window.removeEventListener("auth-changed", handleAuthChanged);
      window.removeEventListener("storage", handleAuthChanged);
    };
  }, []);

  // logout
  function handleLogout() {
    logout();
    setUser(null);
    navigate("/login");
  }

  // imagem padrão se não houver foto
  const avatarSrc = user?.foto ?? "/src/assets/Steve-Jobs.jpg";

  return (
    <Navbar fluid className="!bg-[#47D7AC]">
      {/* Marca */}
      <NavbarBrand as={Link} to="/">
        <img
          src="/src/assets/logo_EcoLink.png"
          className="mr-3 h-6 sm:h-9"
          alt="Ecolink Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          Ecolink
        </span>
      </NavbarBrand>

      {/* Menu de usuário (avatar + dropdown) */}
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" img={avatarSrc} rounded />}
        >
          <DropdownHeader>
            <span className="block text-sm">
              {user?.nome_usuarios ?? "Convidado"}
            </span>
            <span className="block truncate text-sm font-medium">
              {user?.email ?? "—"}
            </span>
          </DropdownHeader>

          <DropdownItem as={Link} to="/">Início</DropdownItem>

          {/* Links extras só se não estiver logado */}
          {!user && (
            <>
              <DropdownItem as={Link} to="/login">Logar</DropdownItem>
              <DropdownItem as={Link} to="/register">Registrar-se</DropdownItem>
            </>
          )}

          {/* Botão de logout se estiver logado */}
          {user && (
            <>
              <DropdownDivider />
              <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
            </>
          )}
        </Dropdown>
        <NavbarToggle />
      </div>

      {/* Links principais */}
      <NavbarCollapse>
        <NavbarLink
          as={Link}
          to="/"
          className="font-bold text-lg !text-white hover:-translate-y-1 hover:scale-110 hover:bg-green-200 hover:underline transition"
        >
          Home
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/about"
          className="font-bold text-lg !text-white hover:-translate-y-1 hover:scale-110 hover:bg-green-200 hover:underline transition"
        >
          Sobre
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/contato"
          className="font-bold text-lg !text-white hover:-translate-y-1 hover:scale-110 hover:bg-green-200 hover:underline transition"
        >
          Contato
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
