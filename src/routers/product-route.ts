import { Router } from "express";
import { ProductController } from "../controllers/product-controller";

export const ProductRouter: Router = Router();

ProductRouter.post("/", ProductController.uploadMiddleware, ProductController.createProduct);
ProductRouter.get("/", ProductController.getAllProducts);
ProductRouter.get("/:id", ProductController.getProductById);
ProductRouter.put("/:id", ProductController.uploadMiddleware, ProductController.updateProduct);
ProductRouter.delete("/", ProductController.deleteProducts);
ProductRouter.delete("/:id", ProductController.deleteProductById);