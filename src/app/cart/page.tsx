import { getShppingCart } from "@/apiCalls/cartApiCalls";
import { CartResponse } from "@/utils/types";
import DeleteCartItem from "./DeleteCartItem";
import QuantityControls from "./QuantityControls";
import Image from "next/image";
import Link from "next/link";
import { getSubtotal } from "@/utils/cartUtils";
import AddProdcutMessage from "@/components/cart/page";
import { DOMAIN } from "@/utils/constants";

const CartPage = async () => {
  const cart: CartResponse = await getShppingCart();

  const subtotal = getSubtotal(cart);

  return (
    <section className="mx-auto max-w-5xl px-5 py-7">
      <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>
      {cart.cart.items.length === 0 ? (
        <AddProdcutMessage />
      ) : (
        <div className="flex flex-col gap-6 md:flex-row lg:items-start">
          {/* Products */}
          <div className="flex-1 space-y-4">
            {cart.cart.items.map((item) => {
              if (!item.product) return null;

              return (
                <div
                  key={item.product.id}
                  className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="relative h-20 w-25 shrink-0 overflow-hidden rounded-lg border border-border">
                    <Image
                      src={`/images/${item.product.image}`}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-lg font-semibold transition hover:opacity-70"
                    >
                      {item.product.name}
                    </Link>

                    <p className="mt-1 text-sm text-muted">
                      Price: ${item.product.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <QuantityControls
                      productId={item.product.id}
                      quantity={item.quantity}
                    />

                    <DeleteCartItem productId={item.product.id} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* total */}
          <div className="w-full lg:sticky lg:top-5 lg:w-80 lg:shrink-0">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="my-4 border-t border-border" />

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <Link
                href={`${DOMAIN}/checkout`}
                className="mt-5 block w-full rounded-lg bg-green-500 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-green-600"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
