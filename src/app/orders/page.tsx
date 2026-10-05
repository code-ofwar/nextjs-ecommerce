import { getOrders } from "@/apiCalls/orderApiCalls";
import { OrdersResponse, OrderStatus } from "@/utils/types";

const OrdersPage = async () => {
  const orders: OrdersResponse = await getOrders();

  const statusColor: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-700",
    [OrderStatus.PROCESSING]: "bg-blue-100 text-blue-700",
    [OrderStatus.SHIPPED]: "bg-purple-100 text-purple-700",
    [OrderStatus.DELIVERED]: "bg-green-100 text-green-700",
    [OrderStatus.CANCELLED]: "bg-red-100 text-red-700",
  };

  return (
    <section className="mx-auto max-w-5xl px-5 py-8">
      <h1 className="mb-6 text-2xl font-bold">My Orders</h1>

      <div className="space-y-6 max-w-4xl m-auto">
        {orders.orders.map((order) => (
          <div
            key={order.order.id}
            className="rounded-lg border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Order #{order.order.id}</h2>

                <p className="mt-1 text-sm text-muted">
                  {new Date(order.order.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                    statusColor[order.order.status]
                  }`}
                >
                  {order.order.status}
                </span>

                <p className="mt-2 font-semibold">
                  ${order.order.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-border pt-4">
              {order.orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-3">
                  <img
                    src={`/images/${item.product.image}`}
                    alt={item.product.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>

                    <p className="text-sm text-muted">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrdersPage;
