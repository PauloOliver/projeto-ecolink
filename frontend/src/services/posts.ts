import api from "./api"; // seu axios pré-configurado

export type PostModel = {
  id_posts: number;
  conteudo_txt: string | null;
  conteudo_foto: string | null;
  data: string;
  usuario_id: number;
  usuario_nome: string;
};

export type PageResp = {
  items: PostModel[];
  nextCursor?: number | null;
};

// Criar um post (texto + foto opcional)
export async function createPost(data: { conteudo_txt?: string; file?: File }) {
  const form = new FormData();
  if (data.conteudo_txt) form.append("conteudo_txt", data.conteudo_txt);
  if (data.file) form.append("file", data.file);

  const token = localStorage.getItem("token");
  const r = await api.post("/posts", form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return r.data as PostModel;
}

// Listar posts com paginação infinita
export async function listPosts(cursor?: number | null, limit = 5) {
  const params: any = { limit };
  if (cursor) params.cursor = cursor;

  const r = await api.get("/posts", { params });
  return r.data as PageResp;
}
