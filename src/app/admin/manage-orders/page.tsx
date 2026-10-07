import { getAllOrders } from "@/apiCalls/orderApiCalls";
import SingleOrder from "@/app/orders/SingleOrder";
import { OrdersResponse } from "@/utils/types";
import React from "react";
import UpdateStatus from "./UpdateStatus";

const ManageOrdersPage = async () => {
  const orders: OrdersResponse = await getAllOrders();
  return (
    <section className="mx-auto max-w-5xl px-5 py-8">
      <h1 className="mb-6 text-2xl font-bold">Manage Orders</h1>

      <div className="space-y-6 max-w-4xl m-auto">
        {orders.orders.map((order) => (
          <div
            key={order.order.id}
            className="overflow-hidden rounded-lg border border-border bg-card"
          >
            <div className="p-5">
              <SingleOrder order={order} />
            </div>
            <div className="flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold">Order Status</h3>
                <p className="mt-1 text-sm text-muted">
                  Update the current order status
                </p>
              </div>

              <UpdateStatus
                orderId={order.order.id}
                currentStatus={order.order.status}
              />
            </div>

            <div className="border-t border-border p-5">
              <h3 className="mb-4 font-semibold">Customer Information</h3>

              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {order.order.fullName}
                </p>

                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {order.order.phone}
                </p>

                <p>
                  <span className="font-medium">Country:</span>{" "}
                  {order.order.country}
                </p>

                <p>
                  <span className="font-medium">City:</span> {order.order.city}
                </p>

                <p className="sm:col-span-2">
                  <span className="font-medium">Address:</span>{" "}
                  {order.order.address}
                </p>

                <p>
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
