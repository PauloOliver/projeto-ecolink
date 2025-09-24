import { BsPersonCircle, BsHeart, BsHeartFill, BsChatDots, BsSend, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useState } from "react";

export type FeedPostModel = {
  id: string | number;
  authorName: string;
  timeLabel: string;
  imageUrl?: string;
  caption?: string;
  link?: string;
};

type Props = { post: FeedPostModel; onLike?: (id: FeedPostModel["id"]) => void };

export function FeedPost({ post, onLike }: Props) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const Media = post.imageUrl ? (
    <div className="relative w-full overflow-hidden rounded-lg bg-gray-100">
      <div className="aspect-[4/5] md:aspect-[4/3] max-h-[70vh]">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={post.imageUrl}
          alt="Post do usuário"
          draggable={false}
        />
      </div>
    </div>
  ) : null;

  return (
    <li className="post w-full">
      <div className="infoUserPost mb-3">
        <div className="nameAndHour flex items-center gap-2">
          <BsPersonCircle size={22} />
          <strong>{post.authorName}</strong>
          <p className="text-gray-500">{post.timeLabel}</p>
        </div>
      </div>

      {post.link ? <a href={post.link} className="block">{Media}</a> : Media}

      <div className="mt-3 flex items-center">
        <button className="p-2 -ml-2 hover:opacity-80 active:scale-95 transition" aria-label="Curtir" onClick={() => { setLiked(v => !v); onLike?.(post.id); }}>
          {liked ? <BsHeartFill size={26} className="text-red-500" /> : <BsHeart size={26} />}
        </button>
        <button className="p-2 hover:opacity-80 active:scale-95 transition" aria-label="Comentar"><BsChatDots size={24} /></button>
        <button className="p-2 hover:opacity-80 active:scale-95 transition" aria-label="Enviar"><BsSend size={24} /></button>
        <button className="p-2 ml-auto hover:opacity-80 active:scale-95 transition" aria-label={saved ? "Remover dos salvos" : "Salvar"} onClick={() => setSaved(v => !v)}>
          {saved ? <BsBookmarkFill size={24} /> : <BsBookmark size={24} />}
        </button>
      </div>

      {post.caption && <p className="legenda mt-1">{post.caption}</p>}
    </li>
  );
}
