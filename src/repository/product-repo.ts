import { database } from "../config/database-config";
import { Product } from "../types/product-type";

export class ProductRepository {
  async createProduct(product: Product) {
    const [result] = await database.execute(
      `
        INSERT INTO products (name, price, image_url, description, product_details, stock)
        VALUES (?, ?, ?, ?, ?, ?)`,
      [
        product.name,
        product.price,
        product.image_url || null,
        product.description || null,
        product.product_details || null,
        product.stock || 0,
      ],
    );

    const insertId = (result as any).insertId;
    return { ...product, id: insertId };
  }

  async getAllProducts(): Promise<Product[]> {
    const [rows] = await database.execute(`SELECT * FROM products`);
    return rows as Product[];
  }

  async getProductById(id: number): Promise<Product | null> {
    const [rows] = await database.execute(
      `SELECT * FROM products WHERE id = ?`,
      [id],
    );
    return (rows as Product[])[0] || null;
  }

  async updateProduct(id: number, data: Partial<Product>): Promise<void> {
    const fields: string[] = [];
    const values: any[] = [];

    // Helper to normalize undefined / empty string → null
    const normalize = (value: any) => {
      if (value === undefined || value === "") return null;
      return value;
    };

    if (data.name !== undefined) {
      fields.push("name = ?");
      values.push(normalize(data.name));
    }

    if (data.price !== undefined) {
      fields.push("price = ?");
      values.push(normalize(data.price));
    }

    if (data.description !== undefined) {
      fields.push("description = ?");
      values.push(normalize(data.description));
    }

    if (data.product_details !== undefined) {
      fields.push("product_details = ?");
      values.push(normalize(data.product_details));
    }

    if (data.stock !== undefined) {
      fields.push("stock = ?");
      values.push(normalize(data.stock));
    }

    if (data.image_url !== undefined) {
      fields.push("image_url = ?");
      values.push(normalize(data.image_url));
    }

    if (fields.length === 0) {
      throw new Error("No fields provided for update");
    }

    const sql = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    await database.query(sql, values);
  }

  async deleteProducts(): Promise<void> {
    await database.execute(`DELETE FROM products`);
  }

  async deleteProductById(id: number): Promise<void> {
    await database.execute(`DELETE FROM products WHERE id = ?`, [id]);
  }
}
