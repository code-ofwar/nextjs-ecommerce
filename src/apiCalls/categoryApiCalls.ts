import { DOMAIN } from "@/utils/constants";

export async function getCategories() {
  const response = await fetch(`${DOMAIN}/api/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();
  return data.caterogries;
}