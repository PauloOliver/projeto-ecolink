import { dbQuery } from "../database/connection.js";

export async function getAll() {
  const { rows } = await dbQuery("SELECT * FROM tb_usuarios");
  return rows;
}