

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