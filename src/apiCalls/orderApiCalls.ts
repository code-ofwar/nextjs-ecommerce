import { DOMAIN } from "@/utils/constants";
import { cookies } from "next/headers";

export async function getOrders() {
  const cookieStore = await cookies();

  const response = await fetch(`${DOMAIN}/api/orders`, {
    cache: "no-cache",
    headers: { Cookie: cookieStore.toString() },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const data = await response.json();
  return data;
}
