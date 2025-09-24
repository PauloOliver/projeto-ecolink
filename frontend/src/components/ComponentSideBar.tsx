import { useState } from "react";
import logo from '../assets/logo-transp.png';
import { Link } from "react-router-dom";
import { Sidebar, SidebarItems, SidebarItemGroup, SidebarItem } from "flowbite-react";
import { HiArrowSmRight, HiHome, HiMap, HiUser, HiViewBoards } from "react-icons/hi";

export default function ComponentSideBar() {
  const [open, setOpen] = useState(false);

  const RIcon = ({ Icon }: { Icon: React.ComponentType<{ size?: number; className?: string }> }) => (
    <>
      <span className="md:hidden"><Icon size={28} className="text-emerald-400" /></span>
      <span className="hidden md:inline"><Icon size={40} className="text-emerald-400" /></span>
    </>
  );

  return (
    <>
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-white/90 backdrop-blur px-4 py-3">
        <img src={logo} alt="Logo" className="w-20 h-auto" />
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
          <HiViewBoards size={20} /> Menu
        </button>
      </div>

      {open && <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50",
          "w-64 md:w-72 h-screen",
          "transform transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <Sidebar aria-label="Sidebar" className="h-full bg-transparent text-white">
          <div className="mt-6 mb-10 px-4">
            <img src={logo} alt="Logo" className="w-32 md:w-40 h-auto mx-auto" />
          </div>

          <SidebarItems>
            <SidebarItemGroup>
              <Link to="/profile">
                <SidebarItem href="#" icon={() => <RIcon Icon={HiUser} />} className="ml-4 mb-4 text-base md:text-xl">Perfil</SidebarItem>
              </Link>
              <Link to="/">
                <SidebarItem href="#" icon={() => <RIcon Icon={HiHome} />} className="ml-4 mb-4 text-base md:text-xl">Página inicial</SidebarItem>
              </Link>
              <Link to="/map">
                <SidebarItem href="#" icon={() => <RIcon Icon={HiMap} />} className="ml-4 mb-4 text-base md:text-xl">Mapa de Coleta</SidebarItem>
              </Link>
              <SidebarItem href="#" icon={() => <RIcon Icon={HiArrowSmRight} />} className="ml-4 mb-4 text-base md:text-xl">Sing Out</SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>

          <div className="md:hidden px-4 pb-4">
            <button onClick={() => setOpen(false)} className="w-full rounded-lg border px-3 py-2 text-sm bg-white text-gray-900">Fechar</button>
          </div>
        </Sidebar>
      </aside>
    </>
  );
}
