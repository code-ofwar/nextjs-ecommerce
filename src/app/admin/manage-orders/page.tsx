import { getAllOrders } from "@/apiCalls/orderApiCalls";
import SingleOrder from "@/app/orders/SingleOrder";
import { OrdersResponse } from "@/utils/types";
import React from "react";
import UpdateStatus from "./UpdateStatus";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/utils/verifyToken";

export const metadata: Metadata = {
  title: "Manage Orders",
  description: "Manage orders in KSP SHOP.",
  robots: {
    index: false,
    follow: false,
  },
};

const ManageOrdersPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToen")?.value as string;
  const user = verifyTokenForPage(token);
  if (!user) {
    redirect("/auth/login");
  }

  if (!user.isAdmin) {
    redirect("/");
  }

  const orders: OrdersResponse = await getAllOrders();
  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-5 sm:py-8">
      <h1 className="mb-5 text-xl font-bold sm:mb-6 sm:text-2xl">
        Manage Orders
      </h1>

      <div className="mx-auto max-w-4xl space-y-4 sm:space-y-6">
        {orders.orders.map((order) => (
          <div
            key={order.order.id}
            className="overflow-hidden rounded-xl border border-border bg-card mb-12"
          >
            <div className="p-3 sm:p-5">
              <SingleOrder order={order} />
            </div>

            <div className="flex flex-col gap-3 border-t border-border p-3 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div>
                <h3 className="text-sm font-semibold sm:text-base">
                  Order Status
                </h3>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Update the current order status
                </p>
              </div>

              <UpdateStatus
                orderId={order.order.id}
                currentStatus={order.order.status}
              />
            </div>

            <div className="border-t border-border p-3 sm:p-5">
              <h3 className="mb-3 text-sm font-semibold sm:mb-4 sm:text-base">
                Customer Information
              </h3>

              <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <p className="break-words">
                  <span className="font-medium">Name:</span>{" "}
                  {order.order.fullName}
                </p>

                <p className="break-words">
                  <span className="font-medium">Phone:</span>{" "}
                  {order.order.phone}
                </p>

                <p className="break-words">
                  <span className="font-medium">Country:</span>{" "}
                  {order.order.country}
                </p>

                <p className="break-words">
                  <span className="font-medium">City:</span> {order.order.city}
                </p>

                <p className="break-words sm:col-span-2">
                  <span className="font-medium">Address:</span>{" "}
                  {order.order.address}
                </p>

                <p className="break-words">
                  <span className="font-medium">Postal Code:</span>{" "}
                  {order.order.postalCode}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageOrdersPage;
