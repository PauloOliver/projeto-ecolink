// src/controllers/PostController.js
import { createPostRepo, listPostsCursor}  from "../repositories/postRepository.js"


export async function createPost(req, res, next) {
  try {
    const userId = req.user && req.user.id; // JWT middleware deve popular req.user
    if (!userId) return res.status(401).json({ status: 'falha', mensagem: 'Usuário não autenticado.' });

    const { conteudo_txt } = req.body;
    if (!conteudo_txt || typeof conteudo_txt !== 'string' || conteudo_txt.trim().length === 0) {
      return res.status(400).json({ status: 'falha', mensagem: 'Conteúdo é obrigatório.' });
    }

    const foto = req.file ? `/uploads/${req.file.filename}` : null;

    const resultado = await createPostRepo({
      conteudo_txt: conteudo_txt.trim(),
      conteudo_foto: foto,
      userId
    });

    if (resultado.status === 'sucesso') {
      return res.status(201).json(resultado.post);
    }

    if (resultado.status === 'falha') {
      // validação / regra de negócio (ex: usuário não existe, conteúdo inválido)
      return res.status(400).json({ status: 'falha', mensagem: resultado.mensagem });
    }

    // erro inesperado ao recuperar/consultar
    if (resultado.status === 'erro') {
      // você pode logar aqui
      console.error('createPostRepo returned error:', resultado.mensagem);
      return res.status(500).json({ status: 'erro', mensagem: 'Erro interno ao criar post.' });
    }

    // fallback: se veio algo inesperado
    return res.status(500).json({ status: 'erro', mensagem: 'Erro desconhecido.' });

  } catch (err) {
    // erro inesperado — passa para handler de erro do Express
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