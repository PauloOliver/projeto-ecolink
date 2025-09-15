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

export function NavigationBar() {
  return (
    <Navbar fluid className="!bg-[#47D7AC]">
      <NavbarBrand href="https://flowbite-react.com">
        <img src="src\assets\logo_EcoLink.png" className="mr-3 h-6 sm:h-9" alt="Ecolink React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Ecolink</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="src\assets\Steve-Jobs.jpg" rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">John Testes</span>
            <span className="block truncate text-sm font-medium">john@email.com</span>
          </DropdownHeader>
          <DropdownItem>Inicio</DropdownItem>
          <DropdownItem>Rede Social</DropdownItem>
          <DropdownItem>Perfil</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sair</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" className="font-bold text-lg text-gray-100 dark:text-gray-100 transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-200 hover:underline" >
          Inicio
        </NavbarLink>
        <NavbarLink href="#" className="font-bold text-lg text-gray-100 dark:text-gray-100 transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-200 hover:underline"> Descubra</NavbarLink>
        <NavbarLink href="#" className="font-bold text-lg text-gray-100 dark:text-gray-100 transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-200 hover:underline"> Contato </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}