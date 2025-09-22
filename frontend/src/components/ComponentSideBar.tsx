import { useState } from "react";
import logo from '../assets/logo_EcoLink.png'

import {
  Sidebar,
  SidebarItems,
  SidebarItemGroup,
  SidebarItem,
} from "flowbite-react";

import {
  HiArrowSmRight,
  HiHome,
  HiMap,
  HiUser,
  HiViewBoards,
  HiPlusCircle,
  HiPlus,
} from "react-icons/hi";

type Props = {
  onCreate: () => void; // ⬅ recebe o handler do App
};

export default function ComponentSideBar({ onCreate }: Props) {
  const [open, setOpen] = useState(false);

  // helper pra renderizar ícone com tamanho responsivo
  const RIcon = ({
    Icon,
  }: {
    Icon: React.ComponentType<{ size?: number; className?: string }>;
  }) => (
    <>
      <span className="md:hidden">
        <Icon size={28} className="text-emerald-400" />
      </span>
      <span className="hidden md:inline">
        <Icon size={40} className="text-emerald-400" />
      </span>
    </>
  );

  return (
    <>
      {/* Topbar só no mobile: logo + botão para abrir o menu */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-white/90 backdrop-blur px-4 py-3">
        <img src={logo} alt="Logo" className="w-20 h-auto" />
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
        >
          <HiViewBoards size={20} />
          Menu
        </button>
      </div>

      {/* Overlay quando o drawer estiver aberto no mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Container lateral: drawer no mobile, fixo no desktop */}
      <aside
        className={[
          "fixed md:static z-50 md:z-auto inset-y-0 left-0",
          "w-64 md:w-72",
          "transform transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <Sidebar aria-label="Sidebar" className="h-full">
          <div className="mt-6 mb-10 px-4">
            <img
              src={logo}
              alt="Logo"
              className="w-32 md:w-40 h-auto mx-auto"
            />
          </div>

          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem
                href="#"
                icon={() => <RIcon Icon={HiUser} />}
                className="ml-6 mb-4 text-base md:text-xl"
              >
                Perfil
              </SidebarItem>

              <SidebarItem
                href="#"
                icon={() => <RIcon Icon={HiHome} />}
                className="ml-6 mb-4 text-base md:text-xl"
              >
                Página inicial
              </SidebarItem>

              <SidebarItem
                href="#"
                icon={() => <RIcon Icon={HiMap} />}
                className="ml-6 mb-4 text-base md:text-xl"
              >
                Mapa de Coleta
              </SidebarItem>

              {/* ✅ Item “Criar” no DESKTOP */}
              <SidebarItem
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onCreate();
                }}
                icon={() => <RIcon Icon={HiPlusCircle} />}
                className="ml-6 mb-4 text-base md:text-xl"
              >
                Criar
              </SidebarItem>

              <SidebarItem
                href="#"
                icon={() => <RIcon Icon={HiArrowSmRight} />}
                className="ml-6 mb-4 text-base md:text-xl"
              >
                Sing Out
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>

          {/* Botão fechar só no mobile */}
          <div className="md:hidden px-4 pb-4">
            <button
              onClick={() => setOpen(false)}
              className="w-full rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
            >
              Fechar
            </button>
          </div>
        </Sidebar>
      </aside>

      {/* ✅ FAB “+” no MOBILE (central inferior) */}
      <div className="md:hidden fixed bottom-5 inset-x-0 z-50 flex justify-center pointer-events-none">
        <button
          onClick={onCreate}
          className="pointer-events-auto inline-flex items-center justify-center h-14 w-14 rounded-full bg-emerald-500 text-white shadow-xl ring-1 ring-black/10 active:scale-95"
          aria-label="Criar"
        >
          <HiPlus size={28} />
        </button>
      </div>
    </>
  );
}