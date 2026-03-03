"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const db_config_1 = require("../config/db-config");
class AuthRepository {
    async createUser(data) {
        const [result] = await db_config_1.database.query(`
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
      `, [data.username, data.email, data.password]);
        return result.insertId;
    }
    async findByEmail(email) {
        const [rows] = await db_config_1.database.query(`
      SELECT * FROM users WHERE email = ?
      `, [email]);
        return rows[0];
    }
    async findById(id) {
        const [rows] = await db_config_1.database.query(`
      SELECT id, username, email, role, created_at
      FROM users
      WHERE id = ?
      `, [id]);
        return rows[0];
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth-repo.js.map