import { getOrders } from "@/apiCalls/orderApiCalls";
import { OrdersResponse, OrderStatus } from "@/utils/types";
import SingleOrder from "./SingleOrder";

const OrdersPage = async () => {
  const orders: OrdersResponse = await getOrders();

  return (
    <section className="mx-auto max-w-5xl px-5 py-8">
      <h1 className="mb-6 text-2xl font-bold">My Orders</h1>

      <div className="space-y-6 max-w-4xl m-auto">
        {orders.orders.map((order) => (
          <div
            key={order.order.id}
            className="rounded-lg border border-border bg-card p-5"
          >
            <SingleOrder order={order} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrdersPage;
