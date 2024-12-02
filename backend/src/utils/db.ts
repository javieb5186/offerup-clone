import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { DBResult } from "../interfaces/db";

// Create multiple connections via pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//
const query = async <T>(sql: string, params?: any[]): Promise<T> => {
  try {
    const [results] = await pool.query(sql, params);
    return results as T;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

const executeSQLFile = (filePath: string): Promise<void> => {
  const sqlFilePath = path.resolve(__dirname, filePath);
  const sql = fs.readFileSync(sqlFilePath, "utf-8");
  return query<DBResult>(sql).then(() => console.log("SQL File executed"));
};

export { pool, query, executeSQLFile };
