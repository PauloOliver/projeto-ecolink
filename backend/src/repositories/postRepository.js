import { dbQuery } from "../database/connection.js";

export async function createPostRepo({ conteudo_txt, conteudo_foto, userId }) {
  const sql = `
    WITH ins AS (
      INSERT INTO tb_posts (conteudo_txt, conteudo_foto, tb_usuarios_id_usuarios)
      VALUES ($1, $2, $3)
      RETURNING id_posts, conteudo_txt, conteudo_foto, data, tb_usuarios_id_usuarios
    )
    SELECT ins.*, u.nome_usuarios AS usuario_nome
    FROM ins
    JOIN tb_usuarios u ON u.id_usuarios = ins.tb_usuarios_id_usuarios
  `;
  const params = [conteudo_txt, conteudo_foto, userId];
  const { rows } = await dbQuery(sql, params);
  return rows[0];
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
  const { rows } = await dbQuery(sql, params);

  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;
  const nextCursor = hasMore ? items[items.length - 1].id_posts : null;

  return { items, nextCursor };
}
