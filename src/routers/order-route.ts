import { Router } from "express";
import { OrderController } from "../controllers/order-controller";

export const OrderRouter: Router = Router();
const orderController = new OrderController();

// Create order
OrderRouter.post("/", orderController.createOrder);

// Get all orders for a user
OrderRouter.get("/user/:userId", orderController.getUserOrders);

// Get single order
OrderRouter.get("/:orderId", orderController.getOrderById);

// Update order status
OrderRouter.patch("/:orderId/status", orderController.updateOrderStatus);
