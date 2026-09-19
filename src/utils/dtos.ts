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
