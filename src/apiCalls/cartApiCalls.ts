import { DOMAIN } from "@/utils/constants";
import { cookies } from "next/headers";


export async function getShppingCart() {
  const cookieStore = await cookies();

  const response = await fetch(`${DOMAIN}/api/cart`, {
    cache: "no-cache",
    headers: { Cookie: cookieStore.toString() },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  const data = await response.json();

  return data;
}
