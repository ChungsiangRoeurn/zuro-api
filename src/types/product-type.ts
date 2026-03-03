export interface Product {
  id?: number;
  name: string;
  price: number;
  image_url?: string;
  description?: string;
  product_details?: string;
  stock?: number;
  created_at?: Date;
  updated_at?: Date;
}
