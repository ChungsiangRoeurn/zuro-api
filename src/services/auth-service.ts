import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRepository } from "../repository/auth-repo.ts";
import type { RegisterInput } from "../types/auth-types.ts";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(data: RegisterInput) {
    const { username, email, password } = data;

    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userId = await this.authRepository.createUser({
      username,
      email,
      password: hashPassword,
      role: "user",
    });

    return { id: userId };
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    return {
      message: "Login sucessfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}
