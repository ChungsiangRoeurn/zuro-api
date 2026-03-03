"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Helper to get env variable safely
function getEnv(name) {
    const value = process.env[name];
    if (!value)
        throw new Error(`Environment variable ${name} is missing`);
    return value;
}
exports.database = promise_1.default.createPool({
    host: getEnv("DB_HOST"),
    port: Number(getEnv("DB_PORT")),
    user: getEnv("DB_USER"),
    password: getEnv("DB_PASSWORD"),
    database: getEnv("DB_NAME"),
    multipleStatements: true,
});
(async () => {
    try {
        const [rows] = await exports.database.query("SELECT 1");
        console.log("➡️ Database connected! 🎉", rows);
    }
    catch (err) {
        console.error("❌ Database connection error:", err.message);
        process.exit(1);
    }
})();
//# sourceMappingURL=db-config.js.map