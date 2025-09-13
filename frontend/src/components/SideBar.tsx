import { useState } from "react";
import { UserPlus, Users, Hash, TrendingUp, Bookmark } from "lucide-react";

export function RightSidebar() {
  const [suggestions, setSuggestions] = useState([
    { id: 1, name: "Ana Lima", avatar: "https://i.pravatar.cc/150?img=12", following: false },
    { id: 2, name: "Carlos Souza", avatar: "https://i.pravatar.cc/150?img=30", following: false },
    { id: 3, name: "Marina Reis", avatar: "https://i.pravatar.cc/150?img=28", following: false },
  ]);

  const trending = [
    { tag: "reciclagem", count: 1280 },
    { tag: "sustentabilidade", count: 940 },
    { tag: "ecopontos", count: 610 },
  ];

  const toggleFollow = (id: number) =>
    setSuggestions((prev) =>
      prev.map((u) => (u.id === id ? { ...u, following: !u.following } : u))
    );

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-6 space-y-4">
        {/* Seu perfil */}
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/150?img=4"
              alt="Você"
              className="w-10 h-10 rounded-full border"
            />
            <div className="min-w-0">
              <p className="font-semibold truncate">Você</p>
              <p className="text-xs text-gray-500 truncate">@voce</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>Seguindo 73 • 112 seguidores</span>
          </div>
          <div className="mt-3">
            <button className="w-full text-sm bg-green-600 text-white rounded-lg py-2 hover:bg-green-700">
              Editar perfil
            </button>
          </div>
        </div>

        {/* Quem seguir */}
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <UserPlus className="w-4 h-4 text-green-600" />
            <h3 className="font-semibold">Quem seguir</h3>
          </div>
          <ul className="space-y-3">
            {suggestions.map((u) => (
              <li key={u.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{u.name}</p>
                    <p className="text-xs text-gray-500 truncate">@{u.name.split(" ")[0].toLowerCase()}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFollow(u.id)}
                  className={`text-xs rounded-full px-3 py-1 border transition ${
                    u.following
                      ? "bg-gray-100 border-gray-300"
                      : "bg-green-600 text-white border-green-600 hover:bg-green-700"
                  }`}
                >
                  {u.following ? "Seguindo" : "Seguir"}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tópicos em alta */}
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <h3 className="font-semibold">Tópicos em alta</h3>
          </div>
          <ul className="space-y-2">
            {trending.map((t) => (
              <li key={t.tag} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  <span>#{t.tag}</span>
                </div>
                <span className="text-gray-500">{t.count.toLocaleString()} posts</span>
              </li>
            ))}
          </ul>
          <button className="mt-3 w-full text-sm border rounded-lg py-2 hover:bg-gray-50 flex items-center justify-center gap-2">
            <Bookmark className="w-4 h-4" />
            Ver tópicos salvos
          </button>
        </div>
      </div>
    </aside>
  );
}
