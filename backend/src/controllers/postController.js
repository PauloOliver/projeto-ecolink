import { createPostRepo, listPostsCursor } from "../repositories/postRepository.js";

export async function createPost(req, res, next) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ status: "falha", mensagem: "Usuário não autenticado." });

    const txtRaw = typeof req.body?.conteudo_txt === "string" ? req.body.conteudo_txt : "";
    const conteudo_txt = txtRaw.trim();

    if (!conteudo_txt) {
      return res.status(400).json({ status: "falha", mensagem: "Conteúdo é obrigatório." });
    }

    const resultado = await createPostRepo({ conteudo_txt, conteudo_foto: null, userId });

    if (resultado.status === "sucesso") return res.status(201).json(resultado.post);
    if (resultado.status === "falha") return res.status(400).json({ status: "falha", mensagem: resultado.mensagem });
    return res.status(500).json({ status: "erro", mensagem: "Erro interno ao criar post." });
  } catch (err) {
    next(err);
  }
}

export async function getPosts(req, res, next) {
  try {
    const { cursor, limit } = req.query;
    const posts = await listPostsCursor({
      cursor: cursor ? Number(cursor) : null,
      limit: limit ? Number(limit) : 10
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
}
