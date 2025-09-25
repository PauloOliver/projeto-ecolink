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
  const [submitting, setSubmitting] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const pendingFileRef = useRef<File | null>(null);
  const tempIdRef = useRef<number | null>(null);

  const API_URL = "http://localhost:3000/api/v1";
  const FILES_BASE_URL = "http://localhost:3000";

  function normalizePost(p: FeedPostModel): FeedPostModel {
    return {
      ...p,
      conteudo_foto: p.conteudo_foto ? `${FILES_BASE_URL}${p.conteudo_foto}` : null,
    };
  }

  function dedupeAndSort(list: FeedPostModel[]) {
    const map = new Map<number, FeedPostModel>();
    for (const p of list) map.set(Number(p.id_posts), p);
    return Array.from(map.values()).sort((a, b) => Number(b.id_posts) - Number(a.id_posts));
  }

  async function fetchPosts(next?: string | null) {
    if (loading || (!hasMore && !next)) return;
    setLoading(true);
    const url = next ? `${API_URL}/posts?cursor=${encodeURIComponent(next)}` : `${API_URL}/posts`;
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token") ?? ""}` },
    });
    if (!r.ok) {
      setLoading(false);
      return;
    }
    const data: PageResp = await r.json();
    const mapped = data.items.map(normalizePost);
    setPosts((prev) => dedupeAndSort([...prev, ...mapped]));
    setCursor(data.nextCursor ?? null);
    setHasMore(Boolean(data.nextCursor));
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts(null);
  }, []);

  function openImagePicker() {
    fileRef.current?.click();
  }

  function handleLocalPreviewAndQueue(file: File) {
    pendingFileRef.current = file;
    const url = URL.createObjectURL(file);
    const tempId = Date.now();
    tempIdRef.current = tempId;
    const novo: FeedPostModel = {
      id_posts: tempId,
      usuario_nome: "Você",
      data: new Date().toISOString(),
      conteudo_txt: captionText.trim() || null,
      conteudo_foto: url,
    };
    setPosts((prev) => dedupeAndSort([novo, ...prev]));
    setCaptionText("");
  }

  async function publish() {
    if (submitting) return;
    if (!captionText.trim() && !pendingFileRef.current) return;

    setSubmitting(true);
    const form = new FormData();
    if (captionText.trim()) form.append("conteudo_txt", captionText.trim());
    if (pendingFileRef.current) form.append("conteudo_foto", pendingFileRef.current);

    const hadFile = pendingFileRef.current != null;
    const currentTempId = tempIdRef.current;

    setCaptionText("");
    pendingFileRef.current = null;
    tempIdRef.current = null;

    try {
      const r = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token") ?? ""}` },
        body: form,
      });
      if (!r.ok) {
        return;
      }
      const created: FeedPostModel = normalizePost(await r.json());
      setPosts((prev) => {
        if (hadFile && currentTempId != null) {
          const replaced = prev.map((p) => (Number(p.id_posts) === currentTempId ? created : p));
          return dedupeAndSort(replaced);
        }
        return dedupeAndSort([created, ...prev]);
      });
    } finally {
      setSubmitting(false);
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
                disabled={submitting || (!captionText.trim() && !pendingFileRef.current)}
              >
                {submitting ? "Publicando..." : "Publicar"}
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
            {posts.map((p) => (
              <FeedPost key={p.id_posts} post={p} />
            ))}
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
          if (file) handleLocalPreviewAndQueue(file);
          e.currentTarget.value = "";
        }}
      />
    </div>
  );
}
