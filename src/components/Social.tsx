import { useState } from "react";
import { PostCard } from "./PostCard";
import { Image } from "lucide-react";
import { RightSidebar } from "./SideBar"; // <- sidebar da direita

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
  image?: string; // opcional
  description: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
}

export function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newDesc, setNewDesc] = useState("");
  const [newImage, setNewImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim() && !newImage) return; // impede post vazio

    const newPost: Post = {
      id: Date.now(),
      user: "Você",
      avatar: "https://i.pravatar.cc/150?img=4",
      image: newImage || undefined,
      description: newDesc.trim(),
      likes: 0,
      liked: false,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewDesc("");
    setNewImage(null);
  };

  return (
    <div className="bg-green-50 min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-3 lg:px-4">
        {/* grid principal: 2 colunas no desktop */}
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          {/* coluna do feed */}
          <main className="max-w-lg mx-auto lg:max-w-2xl lg:mx-0">
            {/* caixa de criação de post */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6 p-4">
              <form onSubmit={addPost} className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://i.pravatar.cc/150?img=4"
                    alt="Perfil"
                    className="w-10 h-10 rounded-full"
                  />
                  <input
                    type="text"
                    placeholder="No que você está pensando?"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {newImage && (
                  <img
                    src={newImage}
                    alt="Pré-visualização"
                    className="w-full rounded-lg max-h-60 object-cover"
                  />
                )}

                <div className="flex justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer text-green-600 font-medium">
                    <Image size={20} />
                    <span>Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>

                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Publicar
                  </button>
                </div>
              </form>
            </div>

            {/* lista de posts */}
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={(id) =>
                  setPosts(
                    posts.map((p) =>
                      p.id === id
                        ? {
                            ...p,
                            liked: !p.liked,
                            likes: p.liked ? p.likes - 1 : p.likes + 1,
                          }
                        : p
                    )
                  )
                }
                onComment={(id, text) =>
                  setPosts(
                    posts.map((p) =>
                      p.id === id
                        ? {
                            ...p,
                            comments: [
                              ...p.comments,
                              {
                                id: Date.now(),
                                user: "Você",
                                avatar: "https://i.pravatar.cc/150?img=3",
                                text,
                              },
                            ],
                          }
                        : p
                    )
                  )
                }
              />
            ))}
          </main>

          {/* sidebar direita (aparece só em telas lg+) */}
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
