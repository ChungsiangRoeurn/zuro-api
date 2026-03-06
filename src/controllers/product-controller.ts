import { Request, Response } from "express";
import { ProductService } from "../services/product-service";
import multer from "multer";
import { Product } from "../types/product-type";

const upload = multer({ dest: "uploads/" });

const productService = new ProductService();

export class ProductController {
  static uploadMiddleware = upload.single("image");

  static async createProduct(req: Request, res: Response) {
    try {
      const { name, price, description, product_details, stock } = req.body;
      const imagePath = req.file ? req.file.path : undefined;

      const product = await productService.createProduct(
        {
          name,
          price: parseFloat(price),
          description,
          product_details,
          stock: parseInt(stock),
        },
        imagePath,
      );
      res.status(201).json(product);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: "Failed to create product", error });
    }
  }

  static async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to get products", error });
    }
  }

  static async getProductById(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam as string, 10);
      const product = await productService.getProductById(id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to get product", error });
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const id = parseInt(idParam as string, 10);

      const { name, price, description, product_details, stock } = req.body;

      // Build partial object safely
      const updateData: Partial<Product> = {};
      if (name !== undefined) updateData.name = name;
      if (price !== undefined && price !== "")
        updateData.price = parseFloat(price);
      if (description !== undefined) updateData.description = description;
      if (product_details !== undefined)
        updateData.product_details = product_details;
      if (stock !== undefined && stock !== "")
        updateData.stock = parseInt(stock);

      const imagePath = req.file ? req.file.path : undefined;

      await productService.updateProduct(id, updateData, imagePath);

      res.json({ message: "Product updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update product", error });
    }
  }

  static async deleteProductById(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam as string, 10);
      await productService.deleteProductById(id);
      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product", error });
    }
  }

  static async deleteProducts(req: Request, res: Response) {
    try {
      await productService.deleteAllProducts();
      res.json({ message: "All products deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete products", error });
    }
  }
}
