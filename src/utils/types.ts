export type JWTPayload = {
  id: number;
  name: string;
  isAdmin: boolean;
};

export type singleParamsProps = {
  params: Promise<{ id: string }>;
};

// this type used by products page and detail page
export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  name: string;
};

export type ReviewWithUser = Review & {
  user: User;
};

export type SingleProduct = Product & {
  reviews: ReviewWithUser[];
};

type CartItem = {
  quantity: number;
  product: Product | null;
};

export type CartResponse = {
  cart: {
    id: number;
    items: CartItem[];
  };
};

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
export type orders = {
  id: number;
  userId: number;
  status: OrderStatus;
  totalPrice: number;
  createdAt: Date;
  fullName: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
};

export type OrderItemWithProduct = {
  id: number;
  orderId: number;
  prodcutId: number;
  quantity: number;
  price: number;
} & { product: Product };

export type OrderWithItemsResponse = {
  order: orders;
  orderItems: OrderItemWithProduct[];
};

export type OrdersResponse = {
  orders: OrderWithItemsResponse[];
};
