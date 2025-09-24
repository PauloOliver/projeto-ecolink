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
  const [hasMore, setHasMore] = useState(true);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const pendingFileRef = useRef<File | null>(null);

  async function fetchPosts(next?: string | null) {
    if (loading || (!hasMore && !next)) return;
    setLoading(true);
    const url = next ? `/api/posts?cursor=${encodeURIComponent(next)}` : `/api/posts`;
    const r = await fetch(url);
    const data: PageResp = await r.json();
    setPosts((prev) => [...prev, ...(data.items || [])]);
    setCursor(data.nextCursor ?? null);
    setHasMore(Boolean(data.nextCursor));
    setLoading(false);
  }

  useEffect(() => { fetchPosts(null); }, []);

  function openImagePicker() { fileRef.current?.click(); }

  function handleLocalPreviewAndQueue(file: File) {
    pendingFileRef.current = file;
    const url = URL.createObjectURL(file);
    const novo: FeedPostModel = {
      id: `local-${Date.now()}`,
      authorName: "Você",
      timeLabel: "agora",
      caption: captionText.trim() || undefined,
      imageUrl: url,
    };
    setPosts((prev) => [novo, ...prev]);
    setCaptionText("");
  }

  async function publish() {
    const form = new FormData();
    const text = captionText.trim();
    if (text) form.append("caption", text);
    if (pendingFileRef.current) form.append("file", pendingFileRef.current);
    if (!text && !pendingFileRef.current) return;

    setCaptionText("");
    const hadFile = pendingFileRef.current != null;
    pendingFileRef.current = null;

    const r = await fetch("/api/posts", { method: "POST", body: form });
    const created: FeedPostModel = await r.json();
    setPosts((prev) => {
      if (hadFile) {
        const i = prev.findIndex((p) => String(p.id).startsWith("local-"));
        if (i >= 0) { const c = prev.slice(); c[i] = created; return c; }
      }
      return [created, ...prev];
    });
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
            <label htmlFor="caption" className="block text-sm font-medium mb-2">Legenda do post</label>
            <input
              id="caption"
              type="text"
              value={captionText}
              onChange={(e) => setCaptionText(e.target.value)}
              placeholder="Escreva uma legenda..."
              className="w-full rounded border px-3 py-2 outline-none focus:ring"
            />
            <div className="mt-3 flex items-center gap-2 justify-end">
              <button onClick={publish} className="rounded bg-emerald-700 px-4 py-2 text-white disabled:opacity-50" disabled={!captionText.trim() && !pendingFileRef.current}>
                Publicar
              </button>
              <button onClick={openImagePicker} className="rounded bg-emerald-600 px-4 py-2 text-white">
                Selecionar imagem
              </button>
            </div>
          </div>

          <ul className="space-y-8">
            {posts.map((p) => (<FeedPost key={p.id} post={p} />))}
          </ul>

          <div className="mt-6 flex justify-center">
            {hasMore ? (
              <button onClick={() => fetchPosts(cursor)} className="rounded bg-emerald-600 px-4 py-2 text-white disabled:opacity-50" disabled={loading}>
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
          if (file) handleLocalPreviewAndQueue(file);
          e.currentTarget.value = "";
        }}
      />
    </div>
  );
}
