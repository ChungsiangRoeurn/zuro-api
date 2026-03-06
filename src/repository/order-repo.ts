import { database } from "../config/database-config";
import { FullOrder, Order, OrderItem, OrderStatus } from "../types/order-type";

export class OrderRepository {
  // -----> Create a new order
  async createOrder(
    userId: number,
    items: { product_id: number; quantity: number; price: number }[],
  ): Promise<FullOrder> {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Insert into order table
    const [orderResult] = await database.execute(
      `INSERT INTO orders (user_id, total ) VALUE (?, ?)`,
      [userId, total],
    );

    const orderId = (orderResult as any).insertId;

    // Insert each item into order_items
    const insertedItems: OrderItem[] = [];
    for (const item of items) {
      const [itemResult] = await database.execute(
        `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
        [orderId, item.product_id, item.quantity, item.price],
      );

      insertedItems.push({
        id: (itemResult as any).insertId,
        order_id: orderId,
        product_id: item.product_id,
        price: item.price,
        quantity: item.quantity,
      });
    }

    // Return data out
    return {
      id: orderId,
      user_id: orderId,
      total: total,
      status: "pending",
      items: insertedItems,
    };
  }

  // -----> Get order for a user
  async getOrdersByUser(userId: number): Promise<FullOrder[]> {
    const [ordersRows] = await database.execute(
      `SELECT * FROM orders WHERE user_id = ?`,
      [userId],
    );
    const orders = ordersRows as Order[];

    const fullOrders: FullOrder[] = [];
    for (const order of orders) {
      const [itemsRows] = await database.execute(
        `SELECT * FROM order_items WHERE order_id = ?`,
        [order.id],
      );
      fullOrders.push({ ...order, items: itemsRows as OrderItem[] });
    }

    return fullOrders;
  }

  // -----> Get single orders by ID (with item)
  async getOrderById(orderId: number): Promise<FullOrder | null> {
    const [orderRows] = await database.execute(
      `SELECT * FROM orders WHERE id = ?`,
      [orderId],
    );
    const order = (orderRows as Order[])[0];
    if (!order) return null;

    const [itemRows] = await database.execute(
      `SELECT * FROM order_items WHERE id = ?`,
      [orderId],
    );
    return {
      ...order,
      items: itemRows as OrderItem[],
    };
  }

  // -----> Update order status
  async updateOrderStatus(orderId: number, status: OrderStatus): Promise<void> {
    await database.execute(`UPDATE orders SET status = ? WHERE id = ?`, [
      status,
      orderId,
    ]);
  }
}
