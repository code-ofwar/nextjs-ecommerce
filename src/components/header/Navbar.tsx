import { CartResponse } from "@/utils/types";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { getShppingCartForCount } from "@/apiCalls/cartApiCalls";
import MobileMenu from "./MobileMenu";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import LogoutButton from "./LogoutButton";

const Navbar = async () => {
  const cart: CartResponse = await getShppingCartForCount();
  const cartCount = cart.cart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const cookieStore = await cookies();
  const token = (cookieStore.get("jwtToken")?.value as string) || "";
  const payload = verifyTokenForPage(token);

  return (
    <nav className="relative border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-xl font-bold text-foreground">
          KSP SHOP
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-muted hover:text-foreground">
            Home
          </Link>

          <Link href="/admin" className="text-muted hover:text-foreground">
            Admin
          </Link>

          <Link href="/categories" className="text-muted hover:text-foreground">
            Categories
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

          <div className="ml-2">
            {payload ? (
              <div className="flex items-center gap-4">
                <strong className="text-sm font-semibold capitalize text-foreground md:text-base">
                  {payload.name}
                </strong>

                <LogoutButton />
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5 md:hidden">
          <Link
            href="/cart"
            className="relative text-muted hover:text-foreground"
          >
            <FaShoppingCart size={22} />

            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
              {cartCount}
            </span>
          </Link>

          <MobileMenu payload={payload} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
