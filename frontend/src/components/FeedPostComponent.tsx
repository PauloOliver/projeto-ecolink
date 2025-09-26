import {
  BsPersonCircle,
  BsHeart,
  BsHeartFill,
  BsChatDots,
  BsSend,
  BsBookmark,
  BsBookmarkFill,
} from "react-icons/bs";
import { useState } from "react";

// O modelo que vem do backend
export type FeedPostModel = {
  id_posts: number;
  usuario_nome: string;
  data: string;
  conteudo_txt?: string | null;
  conteudo_foto?: string | null;
};

type Props = { post: FeedPostModel };

export function FeedPost({ post }: Props) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  // Renderiza mídia (somente se veio do backend)
  const Media = post.conteudo_foto ? (
    <div className="relative w-full overflow-hidden rounded-lg bg-gray-100">
      <div className="aspect-[4/5] md:aspect-[4/3] max-h-[70vh]">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={post.conteudo_foto}
          alt="Post do usuário"
          draggable={false}
        />
      </div>
    </div>
  ) : null;

  return (
    <li className="post w-full">
      {/* Cabeçalho do post */}
      <div className="infoUserPost mb-3">
        <div className="nameAndHour flex items-center gap-2">
          <BsPersonCircle size={22} />
          <strong>{post.usuario_nome}</strong>
          <p className="text-gray-500">
            {new Date(post.data).toLocaleString("pt-BR")}
          </p>
        </div>
      </div>

      {/* Imagem (quando existir) */}
      {Media}

      {/* Botões de ação (placeholders, sem backend por enquanto) */}
      <div className="mt-3 flex items-center">
        <button
          className="p-2 -ml-2 hover:opacity-80 active:scale-95 transition"
          aria-label="Curtir"
          onClick={() => setLiked((v) => !v)}
        >
          {liked ? (
            <BsHeartFill size={26} className="text-red-500" />
          ) : (
            <BsHeart size={26} />
          )}
        </button>

        <button
          className="p-2 hover:opacity-80 active:scale-95 transition"
          aria-label="Comentar"
        >
          <BsChatDots size={24} />
        </button>

        <button
          className="p-2 hover:opacity-80 active:scale-95 transition"
          aria-label="Enviar"
        >
          <BsSend size={24} />
        </button>

        <button
          className="p-2 ml-auto hover:opacity-80 active:scale-95 transition"
          aria-label={saved ? "Remover dos salvos" : "Salvar"}
          onClick={() => setSaved((v) => !v)}
        >
          {saved ? <BsBookmarkFill size={24} /> : <BsBookmark size={24} />}
        </button>
      </div>

      {/* Legenda */}
      {post.conteudo_txt && (
        <p className="legenda mt-1 break-words">{post.conteudo_txt}</p>
      )}
    </li>
  );
}
