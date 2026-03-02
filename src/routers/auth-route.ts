import { Router } from "express";
import { AuthController } from "../controllers/auth-controller.ts";

export const AuthRouter: Router = Router();
const controller = new AuthController();

AuthRouter.post("/register", controller.register);
AuthRouter.post("/login", controller.login);
