import { getShppingCart } from "@/apiCalls/cartApiCalls";
import AddressForm from "./AddressForm";
import { CartResponse } from "@/utils/types";
import AddProdcutMessage from "@/components/cart/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase at KSP SHOP.",
  robots: {
    index: false,
    follow: false,
  },
};

const CheckoutPage = async () => {
  const cart: CartResponse = await getShppingCart();
  return (
    <section className="mx-auto max-w-5xl px-4 py-5 sm:px-5 sm:py-7">
      {cart.cart.items.length === 0 ? (
        <AddProdcutMessage />
      ) : (
        <>
          <h1 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">
            Checkout
          </h1>
          <AddressForm cart={cart} />
        </>
      )}
    </section>
  );
};

export default CheckoutPage;
