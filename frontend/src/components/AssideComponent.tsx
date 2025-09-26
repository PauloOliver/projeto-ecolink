import { useState } from "react";
import profile_picture from "../assets/foto_profile.png"

type Suggestion = {
  id: number;
  name: string;
  avatar: string; // caminho da imagem
  href?: string;
};

const initialSuggestions: Suggestion[] = [
  { id: 1, name: "Glyden Beloni", avatar: profile_picture },
  { id: 2, name: "João Gabriel", avatar: profile_picture },
  { id: 3, name: "Gabriel Gorito", avatar: profile_picture },
  { id: 4, name: "Paulo Vitor", avatar: profile_picture },
  { id: 5, name: "Arthur Alcides", avatar: profile_picture },
  { id: 6, name: "Guilherme Vicente", avatar: profile_picture },
];

export default function AssideComponent() {
  const [following, setFollowing] = useState<Record<number, boolean>>({});

  const toggleFollow = (id: number) =>
    setFollowing((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <aside className="hidden lg:block fixed top-0 right-0 bottom-0 w-[22rem] overflow-y-auto">
      <div className="flex h-full flex-col rounded-l-2xl border-l border-t border-b bg-gray-300/90">
        {/* Cabeçalho */}
        <header className="px-6 pt-6 pb-2">
          <h3 className="text-xl font-extrabold text-gray-900 drop-shadow">
            Sugestões para você
          </h3>
        </header>

        {/* Lista de sugestões */}
        <ul className="flex-1 overflow-auto px-4 py-2 space-y-4">
          {initialSuggestions.map((s) => {
            const isFollowing = !!following[s.id];
            return (
              <li key={s.id}>
                <div className="flex items-center justify-between rounded-xl px-3 py-2">
                  <a
                    href={s.href ?? "#"}
                    className="flex items-center gap-3 text-gray-900 hover:opacity-90"
                  >
                    <img
                      src={s.avatar}
                      alt={`Foto de ${s.name}`}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-gray/30"
                    />
                    <span className="font-medium text-gray-900">{s.name}</span>
                  </a>

                  <button
                    onClick={() => toggleFollow(s.id)}
                    className={[
                      "rounded-lg px-4 py-1.5 text-sm font-semibold transition",
                      isFollowing
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-100"
                        : "bg-teal-400 text-white hover:bg-teal-300",
                    ].join(" ")}
                    aria-pressed={isFollowing}
                  >
                    {isFollowing ? "Seguindo" : "Seguir"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Rodapé */}
        <footer className="mt-auto px-6 pb-6 pt-2 text-center">
          <nav className="text-sm text-black-200">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {[
                "Sobre",
                "Ajuda",
                "Privacidade",
                "Termos",
                "Localizações",
                "Principais Contas",
                "Hashtags",
                "Idioma",
              ].map((label) => (
                <li key={label}>
                  <a href="#" className="hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-3 text-xs text-black-200">&copy; 2025 EcoLink</div>
        </footer>
      </div>
    </aside>
  );
}
