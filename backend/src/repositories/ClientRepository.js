import { dbQuery } from "../database/connection.js";

export async function createUser ({nome_usuarios, senhaHash, email, foto = null, perfil = nulll}){
    const sql = `
      INSERT INTO tb_usuarios (nome_usuarios, senha, email, foto, perfil)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id_usuarios, nome_usuarios, email, foto, perfil`;
      const params = [nome_usuarios, senhaHash, email, foto, perfil];
      const {rows} = await dbQuery(sql, params);
      return rows[0];
}

export async function getByEmail(email) {

  const sql = `SELECT * FROM tb_usuarios WHERE LOWER(email) = LOWER($1) LIMIT 1`;
  const {rows}= await dbQuery(sql, [email]);
  return rows[0] || null;
  
}

//----------------------------------------------
// post e get mapas

export async function createPonto({
  materiais,cep,numero,rua,bairro,cidade,
  horario_funcionamento,contato,observacoes, userId
}) {
 const sql = `
    WITH ins AS (
      INSERT INTO tb_pontos_coleta
        (materiais, cep, numero, rua, bairro, cidade,
         horario_funcionamento, contato, observacoes, tb_usuarios_id_usuarios)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING id_localizacao, materiais, cep, numero, rua, bairro, cidade,
                horario_funcionamento, contato, observacoes, tb_usuarios_id_usuarios
    )
    SELECT ins.*,
           u.id_usuarios   AS usuario_id,
           u.nome_usuarios AS usuario_nome
    FROM ins
    JOIN tb_usuarios u ON u.id_usuarios = ins.tb_usuarios_id_usuarios
  `;
  const params = [materiais, cep, numero, rua, bairro, cidade, horario_funcionamento, contato, observacoes, userId];
  const {rows} = await dbQuery(sql,params);
  return rows[0]
}

export async function listPontosCursor({ limit = 10, cursor = null, userId = null }) {

    const params =  [];
    const where = [];

    if (cursor){
      params.push(Number(cursor));
      where.push(`p.id_localizacao < $${params.length}`);

    }

    if (userId){
      params.push(Number(userId));
      where.push(`p.tb_usuarios_id_usuarios = $${params.length}`);
    }
 const whereSql = where.length? `WHERE ${where.join(" AND ")}` : "";
 params.push(Number(limit)+1);
 const sql = `
    SELECT p.*,
           u.id_usuarios   AS usuario_id,
           u.nome_usuarios AS usuario_nome
    FROM tb_pontos_coleta p
    JOIN tb_usuarios u ON u.id_usuarios = p.tb_usuarios_id_usuarios
    ${whereSql}
    ORDER BY p.id_localizacao DESC
    LIMIT $${params.length}
  `;

  const { rows } = await dbQuery(sql, params);

  const hasMore = rows.length > Number(limit);
  const items = hasMore ? rows.slice(0, Number(limit)) : rows;
  const nextCursor = hasMore ? items[items.length - 1].id_localizacao : null;

  return { items, nextCursor, hasMore };
  
}