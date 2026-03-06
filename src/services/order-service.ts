import { OrderRepository } from "../repository/order-repo";
import { ProductRepository } from "../repository/product-repo";
import { FullOrder } from "../types/order-type";

export class OrderService {
  private orderRepo: OrderRepository;
  private productRepo: ProductRepository;

  constructor() {
    this.orderRepo = new OrderRepository();
    this.productRepo = new ProductRepository();
  }

  // -----> Create order service
  async createOrder(
    userId: number,
    cart: { productId: number; quantity: number }[],
  ): Promise<FullOrder> {
    if (cart.length === 0) {
      throw new Error("Cart is empty");
    }

    // Fetch all products in cart in one go to minimize DB calls
    const products = await Promise.all(
      cart.map((item) => this.productRepo.getProductById(item.productId)),
    );

    const items = cart.map((cartItem, index) => {
      const product = products[index];
      if (!product) {
        throw new Error(`Product ID ${cartItem.productId} not found`);
      }

      if (product.stock! < cartItem.quantity) {
        throw new Error(`Not enough stock for product ${product.name}`);
      }

      return {
        product_id: product.id!,
        price: product.price!,
        quantity: cartItem.quantity,
      };
    });

    // Calculate total
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Create order using repository
    const order = await this.orderRepo.createOrder(userId, items);

    // Deduct stock for each product in one go
    await Promise.all(
      items.map(async (item) => {
        const product = await this.productRepo.getProductById(item.product_id);
        if (!product) return;

        await this.productRepo.updateProduct(item.product_id, {
          stock: product.stock! - item.quantity,
        });
      }),
    );

    return order;
  }

  // -----> Get all orders for a user
  async getUserOrders(userId: number): Promise<FullOrder[]> {
    return this.orderRepo.getOrdersByUser(userId);
  }

  // -----> Get a single order by ID
  async getOrder(orderId: number): Promise<FullOrder | null> {
    return this.orderRepo.getOrderById(orderId);
  }

  // -----> Update order status
  async updateOrderStatus(
    orderId: number,
    status: "pending" | "paid" | "shipped" | "completed" | "cancelled",
  ) {
    await this.orderRepo.updateOrderStatus(orderId, status);
  }
}
