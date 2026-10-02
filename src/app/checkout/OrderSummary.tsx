import { getSubtotal } from "@/utils/cartUtils";
import { CartResponse } from "@/utils/types";
import Image from "next/image";
import React from "react";

type OrderSummaryProps = {
  cart: CartResponse;
};

const OrderSummary = ({ cart }: OrderSummaryProps) => {
  const subtotal = getSubtotal(cart);

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 shadow-sm md:max-w-md mt-15">
      <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>

      <div className="space-y-4">
        {cart.cart.items.map((item) => {
          if (!item.product) return null;

          return (
            <div key={item.product.id} className="flex items-center gap-4">
              <div className="relative h-20 w-25 shrink-0 overflow-hidden rounded-lg border border-border">
                <Image
                  src={`/images/${item.product.image}`}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h3>{item.product.name}</h3>

                <p>Quantity: {item.quantity}</p>
              </div>

              <p>${item.product.price * item.quantity}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
