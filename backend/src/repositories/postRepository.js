import { pool } from "../database/connection.js";


export async function createPostRepo({ titulo, conteudo_txt, conteudo_foto, userId }) {
  const client = await pool.connect(); // pega um cliente da pool
  try {
    await client.query('BEGIN'); // inicia a transação

    // 1) Chama a procedure que faz validações e insert
    await client.query(
      'CALL criar_post($1::text, $2::text, $3::int)',
      [conteudo_txt, conteudo_foto, userId]
    );

    // 2) Recupera o post criado
    const selectSql = `
      SELECT p.id_posts,
             p.conteudo_txt,
             p.conteudo_foto,
             p.curtida,
             p.data,
             p.tb_usuarios_id_usuarios AS id_usuario,
             u.nome_usuarios AS usuario_nome
      FROM tb_posts p
      JOIN tb_usuarios u ON u.id_usuarios = p.tb_usuarios_id_usuarios
      WHERE p.tb_usuarios_id_usuarios = $1
        AND p.conteudo_txt = $2
      ORDER BY p.data DESC, p.id_posts DESC
      LIMIT 1
    `;
    const { rows } = await client.query(selectSql, [userId, conteudo_txt]);
    const post = rows[0] || null;

    if (!post) {
      await client.query('ROLLBACK'); // cancela a transação se não encontrou o post
      return { status: 'erro', mensagem: 'Procedure executou, mas não foi possível recuperar o post.', post: null };
    }

    // garante ISO string para o frontend
    if (post.data) {
      post.data = new Date(post.data).toISOString();
    }

    await client.query('COMMIT'); // confirma a transação
    return { status: 'sucesso', mensagem: 'Post criado com sucesso.', post };

  } catch (err) {
    await client.query('ROLLBACK'); // desfaz tudo se der erro
    return { status: 'falha', mensagem: err.message || 'Erro ao criar post', post: null };
  } finally {
    client.release(); // libera o cliente
  }
}


export async function listPostsCursor({ limit = 10, cursor = null }) {
  const params = [];
  const where = [];

  if (cursor) {
    params.push(cursor);
    where.push(`p.id_posts < $${params.length}`);
  }

  params.push(limit + 1);
  const sql = `
    SELECT p.*, u.nome_usuarios AS usuario_nome
    FROM tb_posts p
    JOIN tb_usuarios u ON u.id_usuarios = p.tb_usuarios_id_usuarios
    ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
    ORDER BY p.id_posts DESC
    LIMIT $${params.length}
  `;
  const { rows } = await pool.query(sql, params);

  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;
  const nextCursor = hasMore ? items[items.length - 1].id_posts : null;

  return { items, nextCursor };
}
