import { createPost, listPosts } from "../repositories/postRepository.js";

export async function postCreate(req, res, next) {
  try {
    const { conteudo_txt, conteudo_foto } = req.body;
    if (!conteudo_txt && !conteudo_foto) {
      return res.status(400).json({ error: "O post precisa de texto ou foto" });
    }

    const post = await createPost({
      conteudo_txt,
      conteudo_foto,
      userId: req.user.id, // vem do JWT
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

export async function getPosts(req, res, next) {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const posts = await listPosts(limit, offset);
    res.json(posts);
  } catch (err) {
    next(err);
  }
}
