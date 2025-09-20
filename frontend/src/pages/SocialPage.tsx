import { useRef, useState } from "react";
import ComponentSideBar from "../components/ComponentSideBar";
import AssideComponent from "../components/AssideComponent";

// ✅ importe o type junto do componente
import { FeedPost, type FeedPostModel } from "../components/FeedPostComponent";

export default function SocialPage() {
  const [posts, setPosts] = useState<FeedPostModel[]>([
    {
      id: 1,
      authorName: "Usuário",
      timeLabel: "2h",
      caption: "Agora temos lixeiras dedicadas aqui na escola",
      imageUrl: "imagensRSocial/post1.jpg",
    },
  ]);

  // input "invisível" para abrir câmera/galeria
  const fileRef = useRef<HTMLInputElement | null>(null);

  function handleCreate() {
    fileRef.current?.click(); // abre câmera/galeria
  }

  function handleFileChosen(file: File) {
    const url = URL.createObjectURL(file);
    const novo: FeedPostModel = {
      id: Date.now(),
      authorName: "Você",
      timeLabel: "agora",
      caption: "Novo post",
      imageUrl: url,
    };
    setPosts((prev) => [novo, ...prev]);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER + SIDEBAR ESQUERDA */}
      <header className="fixed top-0 left-0 right-0 z-40">
        <ComponentSideBar onCreate={handleCreate} />
      </header>

      {/* ASIDE DIREITA: só em lg+ */}
      <aside className="hidden lg:block fixed top-16 right-0 bottom-0 w-[22rem] overflow-y-auto">
        <AssideComponent />
      </aside>

      {/* MAIN */}
      <main
        className="
          pt-24 pb-24 px-4
          md:pt-8 md:pb-8
          md:ml-72
          lg:mr-[22rem]
        "
      >
        <div className="max-w-none lg:max-w-2xl lg:mx-auto">
          <ul className="space-y-8">
            {posts.map((p) => (
              <FeedPost key={p.id} post={p} />
            ))}
          </ul>
        </div>
      </main>

      {/* input invisível: câmera/galeria */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileChosen(file);
          e.currentTarget.value = ""; // permite selecionar o mesmo arquivo novamente
        }}
      />
    </div>
  );
}
