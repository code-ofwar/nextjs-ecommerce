import Link from "next/link";
import React from "react";

const Navbar = () => {
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

          <Link href="/products" className="text-muted hover:text-foreground">
            Products
          </Link>

          <Link href="/cart" className="text-muted hover:text-foreground">
            Cart
          </Link>

          <Link href="/login" className="text-muted hover:text-foreground">
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary-hover"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
