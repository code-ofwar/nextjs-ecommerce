import { SingleProduct } from "@/utils/types";

export async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getSingleProduct(productId: string) {
  const response = await fetch(
    `http://localhost:3000/api/products/${productId}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();

  return data.product;
}
