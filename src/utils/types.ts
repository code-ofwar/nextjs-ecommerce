export type JWTPayload = {
  id: number;
  name: string;
  isAdmin: boolean;
};

export type singleParamsProps = {
  params: Promise<{ id: string }>;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
};