import type { Request, Response } from "express";
import { AuthService } from "../services/auth-service";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      const user = await authService.register({
        email,
        password,
        username,
      });

      res.status(201).json({
        message: "User registered successfully",
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      res.json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}
