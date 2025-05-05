export interface Product {
  id: number;
  user_id: number;
  name: string;
  price: number;
  comments: Comment[];
  description: string;
  created_at: string;
  image: string;
}
export interface Comment {
  id: number;
  user: string; // Username
  user_id: number;
  product_id: number;
  text: string;
  created_at: string; // Date in ISO format
}
export interface CartItem {
  id: number;
  cart_group_id: number;
  product_id: number;
  product: Product;
  status: string;
  name: string;
  quantity: number;
}
export interface CartItemGroup {
  id: number;
  cart_items: CartItem[];
  user_id: number;
  main: boolean;
}
export interface Order {
  id: number;
  user_id: number;
  delivery: string;
  delivery_to: string | null;
  status: string;
  cart_item_group_id: number;
  cart_group: CartItemGroup;
}
export interface Notification {
  id: number;
  supplier_id: number;
  order_id: number;
  order: Order;
}
export interface User {
  id: number;
  username: string;
  description: string;
  email: string;
  logo: string;
  products: Product[];
  comments: Comment[];
  orders: Order[];
  notifications: Notification[];
  cart_item_groups: CartItemGroup[];
}
export interface UserProfile {
  id: number;
  username: string;
  logo: string;
  description: string;
  products: Product[];
}
