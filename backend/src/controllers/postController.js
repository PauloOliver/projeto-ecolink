// src/controllers/PostController.js
import { createPostRepo, listPostsCursor}  from "../repositories/postRepository.js"

export async function createPost(req, res, next) {
  try {
    const userId = req.user.id; // do JWT
    const { conteudo_txt } = req.body;
    console.log("req.file:", req.file);
    const foto = req.file ? `/uploads/${req.file.filename}` : null;

    const post = await createPostRepo({
      conteudo_txt,
      conteudo_foto: foto,
      userId,
    });

    res.status(201).json(post);
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