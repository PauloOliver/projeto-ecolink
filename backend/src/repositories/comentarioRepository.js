import { dbQuery } from "../database/connection.js";

export async function createComentario({ conteudo, userId, postId }) {
  const sql = `
    INSERT INTO tb_comentarios (conteudo, tb_usuarios_id_usuarios, tb_posts_id_posts)
    VALUES ($1, $2::BIGINT, $3::BIGINT)
    RETURNING *;
  `;
  const params = [conteudo, userId, postId];
  const { rows } = await dbQuery(sql, params);
  return rows[0];
}

export async function listComentariosByPost(postId) {
  const sql = `
    SELECT c.*, u.nome_usuarios, u.email
    FROM tb_comentarios c
    JOIN tb_usuarios u ON u.id_usuarios = c.tb_usuarios_id_usuarios
    WHERE c.tb_posts_id_posts = $1::BIGINT
    ORDER BY c.data ASC;
  `;
  const { rows } = await dbQuery(sql, [postId]);
  return rows;
}
