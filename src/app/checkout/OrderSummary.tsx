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
    <div className="mt-6 w-full rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6 md:max-w-md">
      <h2 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">
        Order Summary
      </h2>

      <div className="space-y-4">
        {cart.cart.items.map((item) => {
          if (!item.product) return null;

          return (
            <div
              key={item.product.id}
              className="flex items-center gap-3 sm:gap-4"
            >
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-border sm:h-20 sm:w-25">
                <Image
                  src={`/images/${item.product.image}`}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="break-words text-sm font-medium sm:text-base">
                  {item.product.name}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="shrink-0 text-sm font-medium sm:text-base">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 border-t border-border pt-4 sm:mt-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-base font-semibold sm:text-lg">Total</span>
          <span className="text-base font-bold sm:text-lg">
            ${subtotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
