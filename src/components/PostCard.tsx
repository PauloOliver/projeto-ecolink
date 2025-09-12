import { useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";

interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
}

interface Post {
  id: number;
  user: string;
  avatar: string;
  image?: string;
  description: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
}

interface PostCardProps {
  post: Post;
  onLike: (id: number) => void;
  onComment: (postId: number, text: string) => void;
}

export function PostCard({ post, onLike, onComment }: PostCardProps) {
  const [commentText, setCommentText] = useState("");

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = commentText.trim();
    if (!text) return;
    onComment(post.id, text);
    setCommentText("");
  };

  return (
    <div className="bg-white border border-green-300 rounded-xl shadow-md mb-6 max-w-md mx-auto">
      {/* Cabeçalho */}
      <div className="flex items-center px-4 py-3">
        <img
          src={post.avatar}
          alt={post.user}
          className="w-10 h-10 rounded-full border border-green-300"
        />
        <span className="ml-3 font-semibold">{post.user}</span>
      </div>

      {/* Descrição — agora logo abaixo do cabeçalho */}
      {post.description && (
        <div className="px-4 pb-2 text-sm">
          <span className="font-semibold mr-2">{post.user}</span>
          {post.description}
        </div>
      )}

      {/* Imagem (opcional) */}
      {post.image && (
        <div>
          <img
            src={post.image}
            alt="Post"
            className="w-full max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Ações */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex space-x-4">
          <button onClick={() => onLike(post.id)}>
            <Heart
              className={`w-6 h-6 ${
                post.liked ? "fill-red-500 text-red-500" : "text-gray-700"
              }`}
            />
          </button>
          <MessageCircle className="w-6 h-6 text-gray-700" />
        </div>
      </div>

      {/* Curtidas */}
      <div className="px-4 font-semibold text-sm text-gray-700">
        {post.likes} curtidas
      </div>

      {/* Comentários */}
      <div className="px-4 pb-2">
        {post.comments.slice(0, 2).map((comment) => (
          <div key={comment.id} className="flex items-start space-x-2 py-1 text-sm">
            <img
              src={comment.avatar}
              alt={comment.user}
              className="w-6 h-6 rounded-full"
            />
            <div>
              <span className="font-semibold">{comment.user}</span> {comment.text}
            </div>
          </div>
        ))}
        {post.comments.length > 2 && (
          <div className="text-sm text-gray-500 cursor-pointer">
            Ver todos os {post.comments.length} comentários
          </div>
        )}
      </div>

      {/* Campo de comentário com setinha */}
      <form onSubmit={handleSend} className="px-4 py-2 border-t border-green-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Adicione um comentário..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full p-2 pr-10 text-sm border rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Enviar comentário"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 disabled:opacity-40"
            disabled={!commentText.trim()}
          >
            <Send className="w-5 h-5 text-green-600" />
          </button>
        </div>
      </form>
    </div>
  );
}
