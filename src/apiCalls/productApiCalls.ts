import { DOMAIN } from "@/utils/constants";
import { SingleProduct } from "@/utils/types";

export async function getProducts(category?: string) {
  const url = category
    ? `${DOMAIN}/api/products?category=${category}`
    : `${DOMAIN}/api/products`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getSingleProduct(productId: string) {
  const response = await fetch(`${DOMAIN}/api/products/by-slug/${productId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();

  return data.product;
}
