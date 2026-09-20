import z, { slugify } from "zod";

export const registerSchema = z.object({
  name: z.string().max(30).min(2),
  email: z.string().email().max(100).min(3).toLowerCase(),
  password: z.string().max(50).min(6),
});

export const loginSchema = z.object({
  email: z.string().email().max(100).min(3).toLowerCase(),
  password: z.string().max(50).min(6),
});

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  slug: z.string(),
  image: z.string(),
  stock: z.int(),
  price: z.number(),
  categoryId: z.int(),
});

export const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  slug: z.string().optional(),
  image: z.string().optional(),
  stock: z.int().optional(),
  price: z.number().optional(),
  categoryId: z.int().optional(),
});

export const createCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
});

export const updateCategorySchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
});

export const addCartSchema = z.object({
  productId: z.int(),
  quantity: z.int().min(1),
});

export const updateCartSchema = z.object({
  productId: z.int(),
  quantity: z.int().min(1)
});

export const deleteCartSchema = z.object({
  productId: z.int(),
});
