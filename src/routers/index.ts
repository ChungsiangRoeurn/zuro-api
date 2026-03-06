import { Router } from "express";
import { AuthRouter } from "./auth-route";
import { ProductRouter } from "./product-route";
import { OrderRouter } from "./order-route";

export const MainRouter: Router = Router();

MainRouter.use("/auth", AuthRouter);
MainRouter.use("/product", ProductRouter);
MainRouter.use("/order", OrderRouter);
