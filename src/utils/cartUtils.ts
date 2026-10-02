import { CartResponse } from "@/utils/types";

export const getSubtotal = (cart: CartResponse) => {
  return cart.cart.items.reduce((total, item) => {
    if (!item.product) return total;

    return total + item.product.price * item.quantity;
  }, 0);
};