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
import post1 from '../assets/separar_caixa.jpg'

export type FeedPostModel = {
  id: string | number;
  authorName: string;
  timeLabel: string;        // "2h"
  imageUrl?: string;
  caption?: string;
  link?: string;            // opcional: para abrir detalhes
};

type Props = {
  post: FeedPostModel;
  onLike?: (id: FeedPostModel["id"]) => void;
};

export function FeedPost({ post, onLike }: Props) {
  // estados locais apenas para UX dos botões (opcional)
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  // usa a imagem do post ou o placeholder
  const imgSrc = post.imageUrl ?? post1;

  // mídia com proporção fixa 4:5 (igual ao Instagram)
  const Media = (
    <div className="relative w-full overflow-hidden rounded-lg bg-gray-100">
      <div className="aspect-[4/5]">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={post1}
          alt="Post do usuário"
          draggable={false}
        />
      </div>
    </div>
  );

  return (
    <li className="post w-full">
      {/* header do post */}
      <div className="infoUserPost mb-3">
        <div className="nameAndHour flex items-center gap-2">
          <BsPersonCircle size={22} />
          <strong>{post.authorName}</strong>
          <p className="text-gray-500">{post.timeLabel}</p>
        </div>
      </div>

      {/* mídia com link opcional */}
      {post.link ? (
        <a href={post.link} className="block">
          {Media}
        </a>
      ) : (
        Media
      )}

      {/* ações estilo Instagram */}
      <div className="mt-3 flex items-center">
        <button
          className="p-2 -ml-2 hover:opacity-80 active:scale-95 transition"
          aria-label="Curtir"
          onClick={() => {
            setLiked((v) => !v);
            onLike?.(post.id);
          }}
        >
          {liked ? <BsHeartFill size={26} className="text-red-500" /> : <BsHeart size={26} />}
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

      {post.caption && <p className="legenda mt-1">{post.caption}</p>}
    </li>
  );
}
