import { getOrders } from "@/apiCalls/orderApiCalls";
import { OrdersResponse, OrderStatus } from "@/utils/types";
import SingleOrder from "./SingleOrder";

import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View and track your orders at KSP SHOP.",
  robots: {
    index: false,
    follow: false,
  },
};

const OrdersPage = async () => {
  const cookieStore = await cookies();
    const token = cookieStore.get("jwtToen")?.value as string;
    if(!token) redirect("/auth/login")

  const orders: OrdersResponse = await getOrders();

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-5 sm:py-8">
      <h1 className="mb-6 text-xl font-bold sm:text-2xl">My Orders</h1>

      <div className="mx-auto max-w-4xl space-y-4 sm:space-y-6">
        {orders.orders.map((order) => (
          <div
            key={order.order.id}
            className="rounded-xl border border-border bg-card p-3 mb-8 sm:p-5"
          >
            <SingleOrder order={order} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default OrdersPage;
