import { dbQuery } from "../database/connection.js";

export async function createPost({ conteudo_txt, conteudo_foto, userId }) {
  const sql = `
    INSERT INTO tb_posts (conteudo_txt, conteudo_foto, tb_usuarios_id_usuarios)
    VALUES ($1, $2, $3::BIGINT)
    RETURNING *;
  `;
  const params = [conteudo_txt, conteudo_foto, userId];
  const { rows } = await dbQuery(sql, params);
  return rows[0];
}

export async function listPosts(limit = 10, offset = 0) {
  const sql = `
    SELECT p.*, u.nome_usuarios, u.email
    FROM tb_posts p
    JOIN tb_usuarios u ON u.id_usuarios = p.tb_usuarios_id_usuarios
    ORDER BY p.data DESC
    LIMIT $1 OFFSET $2;
  `;
  const { rows } = await dbQuery(sql, [limit, offset]);
  return rows;
}
