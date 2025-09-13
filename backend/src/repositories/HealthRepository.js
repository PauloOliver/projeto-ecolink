import { dbQuery } from "../database/connection.js";


export async function pingNow() {
  const { rows } = await dbQuery("SELECT NOW() AS now");
  return rows[0];
}
