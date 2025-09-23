import { createComentario, listComentariosByPost } from "../repositories/comentarioRepository.js";

export async function comentarioCreate(req, res, next) {
  try {
    const { conteudo, postId } = req.body;
    if (!conteudo) return res.status(400).json({ error: "Comentário não pode ser vazio" });

    const comentario = await createComentario({
      conteudo,
      userId: req.user.id, // JWT
      postId,
    });

    res.status(201).json(comentario);
  } catch (err) {
    next(err);
  }
}

export async function getComentarios(req, res, next) {
  try {
    const { postId } = req.params;
    const comentarios = await listComentariosByPost(postId);
    res.json(comentarios);
  } catch (err) {
    next(err);
  }
}
