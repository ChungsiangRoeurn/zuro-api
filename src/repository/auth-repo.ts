import { database } from "../config/db-config.ts";
import type { CreateUser } from "../types/auth-types.ts";

export class AuthRepository {
  async createUser(data: CreateUser) {
    const [result]: any = await database.query(
      `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
      `,
      [data.username, data.email, data.password],
    );

    return result.insertId;
  }

  async findByEmail(email: string) {
    const [rows]: any = await database.query(
      `
      SELECT * FROM users WHERE email = ?
      `,
      [email],
    );

    return rows[0];
  }

  async findById(id: number) {
    const [rows]: any = await database.query(
      `
      SELECT id, username, email, role, created_at
      FROM users
      WHERE id = ?
      `,
      [id],
    );

    return rows[0];
  }
}
