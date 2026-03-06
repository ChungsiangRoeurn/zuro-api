import { z } from "zod";

export const createOrderSchema = z.object({
  userId: z.number(),
  cart: z
    .array(
      z.object({
        productId: z.number(),
        quantity: z.number().min(1),
      }),
    )
    .min(1),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["pending", "paid", "shipped", "completed", "cancelled"]),
});
