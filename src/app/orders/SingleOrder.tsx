import { OrdersResponse, OrderStatus } from "@/utils/types";
import Image from "next/image";

type SingleOrderProps = {
  order: OrdersResponse["orders"][number];
};

const SingleOrder = ({ order }: SingleOrderProps) => {
  const statusColor: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-700",
    [OrderStatus.PROCESSING]: "bg-blue-100 text-blue-700",
    [OrderStatus.SHIPPED]: "bg-purple-100 text-purple-700",
    [OrderStatus.DELIVERED]: "bg-green-100 text-green-700",
    [OrderStatus.CANCELLED]: "bg-red-100 text-red-700",
  };

  return (
    <>
      {/* Order Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold sm:text-lg">
            Order #{order.order.id}
          </h2>

          <p className="mt-1 text-xs text-muted sm:text-sm">
            {new Date(order.order.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-col sm:items-end">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium sm:text-sm ${
              statusColor[order.order.status]
            }`}
          >
            {order.order.status}
          </span>

          <p className="text-base font-semibold sm:text-lg">
            ${order.order.totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-4 border-t border-border pt-3 sm:mt-5 sm:pt-4">
        {order.orderItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 border-b border-border py-3 last:border-b-0 sm:gap-4"
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-border sm:h-16 sm:w-16">
              <Image
                src={`/images/${item.product.image}`}
                alt={item.product.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="break-words text-sm font-medium sm:text-base">
                {item.product.name}
              </p>

              <p className="mt-1 text-xs text-muted sm:text-sm">
                Quantity: {item.quantity}
              </p>
            </div>

            <p className="shrink-0 text-sm font-medium sm:text-base">
              ${item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SingleOrder;
