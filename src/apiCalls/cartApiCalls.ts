import { DOMAIN } from "@/utils/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getShppingCart() {
  const cookieStore = await cookies();

  const response = await fetch(`${DOMAIN}/api/cart`, {
    cache: "no-cache",
    headers: { Cookie: cookieStore.toString() },
  });

  if (response.status === 401) {
    redirect("/login");
  }

  if (response.status === 404) {
    return { cart: { items: [] } };
  }

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json();
}

export async function getShppingCartForCount() {
  const cookieStore = await cookies();

  const response = await fetch(`${DOMAIN}/api/cart`, {
    cache: "no-cache",
    headers: { Cookie: cookieStore.toString() },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 404) {
      return { cart: { items: [] } };
    }

    throw new Error("Failed to fetch cart");
  }

  const data = await response.json();

  return data;
}
