import fs from "fs";
import path from "path";
import { database } from "../config/database-config";

// Compute __dirname from project root to avoid using import.meta (which requires specific TS module settings)
const __dirname = path.resolve(process.cwd(), "src", "database");

const seedsPath = path.join(__dirname, "seeds");

async function runSeeds() {
  if (!fs.existsSync(seedsPath)) {
    console.warn("⚠️ Seed folder not found. Nothing to run.");
    return;
  }

  const files = fs
    .readdirSync(seedsPath)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.warn("⚠️ No seed files found in seed folder.");
    return;
  }

  for (const file of files) {
    const sql = fs.readFileSync(path.join(seedsPath, file), "utf8").trim();
    if (!sql) continue;

    try {
      console.log(`➡️ Seeding: ${file}`);
      await database.query(sql);
      console.log(`✅ Seeded: ${file}`);
    } catch (err: any) {
      console.error(`❌ Seeding failed for ${file}:`, err.message);
      throw err;
    }
  }
}

(async () => {
  try {
    await runSeeds();
    console.log("🎉 All seeds executed successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await database.end();
  }
})();
