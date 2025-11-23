import { useEffect, useRef, useState } from "react";
import ComponentSideBar from "../components/ComponentSideBar";
import AssideComponent from "../components/AssideComponent";
import { FeedPost, type FeedPostModel } from "../components/FeedPostComponent";

type PageResp = { items: FeedPostModel[]; nextCursor?: string | null };

export default function SocialPage() {
  const [captionText, setCaptionText] = useState("");
  const [posts, setPosts] = useState<FeedPostModel[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const pendingFileRef = useRef<File | null>(null);

  const API_URL =
    import.meta.env.VITE_API_URL || `${window.location.origin}/api/v1`;
  const FILES_BASE_URL =
    import.meta.env.VITE_FILES_BASE_URL || window.location.origin;

  const normalizePost = (p: FeedPostModel): FeedPostModel => {
    const foto = p.conteudo_foto ?? null;
    if (!foto) return { ...p, conteudo_foto: null };
    if (/^https?:\/\//i.test(foto)) return { ...p, conteudo_foto: foto };
    const base = FILES_BASE_URL.endsWith("/") ? FILES_BASE_URL : FILES_BASE_URL + "/";
    const rel = foto.startsWith("/") ? foto.slice(1) : foto;
    return { ...p, conteudo_foto: base + rel };
  };

  function dedupeById(list: FeedPostModel[]) {
    const seen = new Set<number>();
    const out: FeedPostModel[] = [];
    for (const item of list) {
      const id = Number(item.id_posts);
      if (!seen.has(id)) {
        seen.add(id);
        out.push(item);
      }
    }
    return out;
  }

  async function fetchPosts(next?: string | null) {
    if (loading || (!hasMore && !next)) return;
    setLoading(true);

    const url = next
      ? `${API_URL}/posts?cursor=${encodeURIComponent(next)}`
      : `${API_URL}/posts`;

    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token") ?? ""}` },
    });

    if (!r.ok) {
      setLoading(false);
      return;
    }

    const data: PageResp = await r.json();
    const mapped = data.items.map(normalizePost);

    setPosts(prev => dedupeById([...prev, ...mapped]));
    setCursor(data.nextCursor ?? null);
    setHasMore(Boolean(data.nextCursor));
    setLoading(false);
  }

  useEffect(() => { fetchPosts(null); }, []);

  function openImagePicker() {
    fileRef.current?.click();
  }

  function onPickFile(file: File) {
    pendingFileRef.current = file;
  }

  async function publish() {
  if (publishing) return;
  const text = captionText.trim();
  if (!text) return;

  setPublishing(true);
  try {
    const r = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`
      },
      body: JSON.stringify({ conteudo_txt: text })
    });

    if (!r.ok) return;

    const created: FeedPostModel = normalizePost(await r.json());
    setPosts((prev) => [created, ...prev]);
    setCaptionText("");
    pendingFileRef.current = null;
    if (fileRef.current) fileRef.current.value = "";
  } finally {
    setPublishing(false);
  }
}


  return (
    <div className="min-h-screen bg-gray-50">
      <ComponentSideBar />

      <aside className="hidden lg:block fixed top-0 right-0 h-screen w-[22rem] overflow-y-auto p-4">
        <AssideComponent />
      </aside>

      <main className="px-4 py-6 md:ml-64 lg:ml-72 lg:mr-[22rem]">
        <div className="max-w-none lg:max-w-2xl lg:mx-auto">
          <div className="mb-6 rounded-lg bg-white shadow p-4">
            <label htmlFor="caption" className="block text-sm font-medium mb-2">
              Legenda do post
            </label>
            <input
              id="caption"
              type="text"
              value={captionText}
              onChange={(e) => setCaptionText(e.target.value)}
              placeholder="Escreva uma legenda..."
              className="w-full rounded border px-3 py-2 outline-none focus:ring"
            />
            <div className="mt-3 flex items-center gap-2 justify-end">
              <button
                onClick={publish}
                className="rounded bg-emerald-700 px-4 py-2 text-white disabled:opacity-50"
                disabled={publishing || (!captionText.trim() && !pendingFileRef.current)}
              >
                {publishing ? "Publicando..." : "Publicar"}
              </button>
              <button
                onClick={openImagePicker}
                className="rounded bg-emerald-600 px-4 py-2 text-white"
              >
                Selecionar imagem
              </button>
            </div>
          </div>

          <ul className="space-y-8">
            {posts.map((p) => (<FeedPost key={p.id_posts} post={p} />))}
          </ul>

          <div className="mt-6 flex justify-center">
            {hasMore ? (
              <button
                onClick={() => fetchPosts(cursor)}
                className="rounded bg-emerald-600 px-4 py-2 text-white disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Carregando..." : "Carregar mais"}
              </button>
            ) : (
              <span className="text-sm text-gray-500">Sem mais posts</span>
            )}
          </div>
        </div>
      </main>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPickFile(file);
          if (fileRef.current) fileRef.current.value = "";
        }}
      />
    </div>
  );
}
