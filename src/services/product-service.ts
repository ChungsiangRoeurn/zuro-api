import { ProductRepository } from "../repository/product-repo";
import cloudinary from "../config/cloudinary-config";
import fs from "fs";
import { Product } from "../types/product-type";

export class ProductService {
  private productRepo = new ProductRepository();

  async createProduct(data: Product, imagePath?: string): Promise<Product> {
    if (imagePath) {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "products",
      });
      data.image_url = result.secure_url;

      fs.unlinkSync(imagePath);
    }

    return this.productRepo.createProduct(data);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepo.getAllProducts();
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.productRepo.getProductById(id);
  }

  async updateProduct(
    id: number,
    data: Partial<Product>,
    imagePath?: string,
  ): Promise<void> {
    if (imagePath) {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "products",
      });
      data.image_url = result.secure_url;
      fs.unlinkSync(imagePath);
    }

    await this.productRepo.updateProduct(id, data);
  }

  async deleteAllProducts(): Promise<void> {
    await this.productRepo.deleteProducts();
  }

  async deleteProductById(id: number): Promise<void> {
    await this.productRepo.deleteProductById(id);
  }
}
