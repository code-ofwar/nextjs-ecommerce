import { getShppingCart } from "@/apiCalls/cartApiCalls";
import AddressForm from "./AddressForm";
import { CartResponse } from "@/utils/types";
import AddProdcutMessage from "@/components/cart/page";

const CheckoutPage = async () => {
  const cart: CartResponse = await getShppingCart();
  return (
    <section className="mx-auto max-w-5xl px-5 py-7">
      {cart.cart.items.length === 0 ? (
        <AddProdcutMessage />
      ) : (
        <>
          <h1 className="mb-6 text-2xl font-bold">Checkout</h1>
          <AddressForm cart={cart} />
        </>
      )}
    </section>
  );
};

export default CheckoutPage;
