"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { JWTPayload } from "@/utils/types";
import LogoutButton from "./LogoutButton";

type MobileMenuProps = {
  payload: JWTPayload | null;
};

const MobileMenu = ({ payload }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="text-foreground"
      >
        {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 w-full border-b border-border bg-card px-6 py-4">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-foreground"
            >
              Home
            </Link>

            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-foreground"
            >
              Admin
            </Link>

            <Link
              href="/categories"
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-foreground"
            >
              Categories
            </Link>

            <Link
              href="/orders"
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-foreground"
            >
              Orders
            </Link>

            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-foreground"
            >
              Products
            </Link>

            {payload ? (
              <>
                <strong className="text-foreground capitalize">
                  {payload?.name}
                </strong>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="text-muted hover:text-foreground"
                >
                  Login
                </Link>

                <Link
                  href="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="text-muted hover:text-foreground"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
