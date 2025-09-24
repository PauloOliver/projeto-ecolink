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
import { getCurrentUser, logout } from "../services/auth"; // helpers

// Tipo de usuário (mesmo que você usa no auth.ts)
type User = {
  id_usuarios: number;
  nome_usuarios: string;
  email: string;
  foto?: string | null;
};

export function NavbarComponent() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  // Carrega usuário ao montar e atualiza em login/logout
  useEffect(() => {
    setUser(getCurrentUser());

    const handleAuthChanged = () => setUser(getCurrentUser());
    window.addEventListener("auth-changed", handleAuthChanged);
    window.addEventListener("storage", handleAuthChanged);

    return () => {
      window.removeEventListener("auth-changed", handleAuthChanged);
      window.removeEventListener("storage", handleAuthChanged);
    };
  }, []);

  function handleLogout() {
    logout();
    setUser(null);
    navigate("/login");
  }

  const avatarSrc = user?.foto ?? "/src/assets/foto_profile1.png";

  return (
    <Navbar fluid className="!bg-[#47D7AC]">
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

      {/* Menu do usuário */}
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

          {!user ? (
            <>
              <DropdownItem as={Link} to="/login">Logar</DropdownItem>
              <DropdownItem as={Link} to="/register">Registrar-se</DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem as={Link} to="/profile">Perfil</DropdownItem>
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
          className="font-bold text-lg text-white hover:-translate-y-1 hover:scale-110 hover:bg-green-200 hover:underline transition !text-white"
        >
          Home
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/map"
          className="font-bold text-lg text-white hover:-translate-y-1 hover:scale-110 hover:bg-green-200 hover:underline transition !text-white"
        >
          Mapa
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/social"
          className="font-bold text-lg text-white hover:-translate-y-1 hover:scale-110 hover:bg-green-200 hover:underline transition !text-white"
        >
          Social
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
