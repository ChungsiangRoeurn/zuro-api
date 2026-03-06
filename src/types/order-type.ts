export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "completed"
  | "cancelled";

export interface Order {
  id: number;
  user_id: number;
  total: number;
  status: OrderStatus;
  created_at?: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface FullOrder extends Order {
  items: OrderItem[];
}
