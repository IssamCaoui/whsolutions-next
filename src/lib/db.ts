// src/lib/db.ts
import mysql from "mysql2/promise";

// Support Railway MySQL variables (MYSQLHOST, etc.) AND generic DB_* variables
const pool = mysql.createPool({
  host:     process.env.MYSQLHOST     || process.env.DB_HOST     || "localhost",
  port:     parseInt(process.env.MYSQLPORT     || process.env.DB_PORT     || "3306"),
  database: process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE || process.env.DB_NAME || "whsolutions",
  user:     process.env.MYSQLUSER     || process.env.DB_USER     || "root",
  password: process.env.MYSQLPASSWORD || process.env.DB_PASS     || "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4",
});

export default pool;

// Convenience query helper — uses pool.query (text protocol) instead of
// pool.execute (binary prepared statements) to avoid LIMIT/OFFSET param
// issues on Railway MySQL.
export async function query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]> {
  const [rows] = await pool.query(sql, params);
  return rows as T[];
}
