"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_config_1 = require("../config/db-config");
// Compute __dirname from project root to avoid using import.meta (which requires specific TS module settings)
const __dirname = path_1.default.resolve(process.cwd(), "src", "database");
const seedsPath = path_1.default.join(__dirname, "seeds");
async function runSeeds() {
    if (!fs_1.default.existsSync(seedsPath)) {
        console.warn("⚠️ Seed folder not found. Nothing to run.");
        return;
    }
    const files = fs_1.default
        .readdirSync(seedsPath)
        .filter((f) => f.endsWith(".sql"))
        .sort();
    if (files.length === 0) {
        console.warn("⚠️ No seed files found in seed folder.");
        return;
    }
    for (const file of files) {
        const sql = fs_1.default.readFileSync(path_1.default.join(seedsPath, file), "utf8").trim();
        if (!sql)
            continue;
        try {
            console.log(`➡️ Seeding: ${file}`);
            await db_config_1.database.query(sql);
            console.log(`✅ Seeded: ${file}`);
        }
        catch (err) {
            console.error(`❌ Seeding failed for ${file}:`, err.message);
            throw err;
        }
    }
}
(async () => {
    try {
        await runSeeds();
        console.log("🎉 All seeds executed successfully!");
    }
    catch (err) {
        console.error(err);
    }
    finally {
        await db_config_1.database.end();
    }
})();
//# sourceMappingURL=seed.js.map