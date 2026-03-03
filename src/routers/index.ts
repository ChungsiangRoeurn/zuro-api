import { Router } from "express";
import { AuthRouter } from "./auth-route";
import { ProductRouter } from "./product-route";

export const MainRouter: Router = Router();

MainRouter.use("/auth", AuthRouter);
MainRouter.use("/product", ProductRouter);
