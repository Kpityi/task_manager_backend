import mysql from "mysql2/promise";
import {
  DB_NAME,
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
} from "./common/environment.js";

async function query(sql, params) {
  const db = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    timezone: "Z",
  });

  const [results] = await db.execute(sql, params);

  await db.end();

  return results;
}

export default { query };
