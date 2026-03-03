import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Helper to get env variable safely
function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Environment variable ${name} is missing`);
  return value;
}

export const database = mysql.createPool({
  host: getEnv("DB_HOST"),
  port: Number(getEnv("DB_PORT")),
  user: getEnv("DB_USER"),
  password: getEnv("DB_PASSWORD"),
  database: getEnv("DB_NAME"),
  multipleStatements: true,
});

(async () => {
  try {
    const [rows] = await database.query("SELECT 1");
    console.log("➡️ Database connected! 🎉", rows);
  } catch (err: any) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
})();
