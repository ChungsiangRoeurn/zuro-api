import { Router } from "express";
import { AuthRouter } from "./auth-route";

export const MainRouter: Router = Router();

MainRouter.use("/auth", AuthRouter);
