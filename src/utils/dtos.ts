export type RegisterUserDto = {
  name: string;
  email: string;
  password: string;
};

export type LoginUserDto = {
  email: string;
  password: string;
};

export type CreateProductDto = {
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
};

export type updateProductDto = {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  stock?: number;
  image?: string;
  categoryId?: number;
};

export type CreateCategoryDto = {
  name: string;
  slug: string;
};

export type UpdateCategoryDto = {
  name?: string;
  slug?: string;
};

export type AddCarttDto = {
  productId: number;
  quantity: number;
};

export type UpdateCartDto = {
  productId: number;
  quantity: number;
};

export type DeleteCartDto = {
  productId: number;
};

enum OrderStatus {
  PENDING,
  PROCESSING,
  SHIPPED,
  DELIVERED,
  CANCELLED,
}

export type CreateOrderDto = {
  status: OrderStatus;
  totalPrice: number;
};

export type UpdateOrderDto = {
  status: OrderStatus
}

