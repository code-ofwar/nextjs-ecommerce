import { getShppingCartForCount } from "@/apiCalls/cartApiCalls";
import { CartResponse } from "@/utils/types";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = async () => {
  const cart: CartResponse = await getShppingCartForCount();
  const cartCount = cart.cart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-foreground">
          KSP SHOP
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-muted hover:text-foreground">
            Home
          </Link>

          <Link href="/orders" className="text-muted hover:text-foreground">
            Orders
          </Link>

          <Link href="/products" className="text-muted hover:text-foreground">
            Products
          </Link>

          <Link
            href="/cart"
            className="relative text-muted hover:text-foreground"
          >
            <FaShoppingCart size={22} />

            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
              {cartCount}
            </span>
          </Link>

          <Link
            href="/auth/login"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            Login
          </Link>

          <Link
            href="/auth/register"
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-80"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
