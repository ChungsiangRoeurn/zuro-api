import { Request, Response } from "express";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "../validation/order-schema";
import { OrderService } from "../services/order-service";

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  // -----> Create Order
  createOrder = async (req: Request, res: Response) => {
    try {
      const validated = createOrderSchema.parse(req.body);

      const order = await this.orderService.createOrder(
        validated.userId,
        validated.cart,
      );

      res.status(201).json({
        success: true,
        data: order,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  // -----> Get orders of user
  getUserOrders = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId);

      const orders = await this.orderService.getUserOrders(userId);

      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  // -----> Get single order
  getOrderById = async (req: Request, res: Response) => {
    try {
      const orderId = Number(req.params.orderId);

      const order = await this.orderService.getOrder(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  // -----> Update order status
  updateOrderStatus = async (req: Request, res: Response) => {
    try {
      const validated = updateOrderStatusSchema.parse(req.body);
      const orderId = Number(req.params.orderId);

      await this.orderService.updateOrderStatus(orderId, validated.status);

      res.status(200).json({
        success: true,
        message: "Order status updated",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}
