import Link from "next/link";
import { getCategories } from "@/apiCalls/categoryApiCalls";
import { getProducts } from "@/apiCalls/productApiCalls";
import type { Category, Product } from "@/utils/types";
import ProductItem from "@/components/ProductItem";

import {
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaRegKeyboard,
  FaTag,
} from "react-icons/fa";
import React from "react";

const categoryIcons: Record<string, React.ReactNode> = {
  phones: <FaMobileAlt size={32} />,
  laptops: <FaLaptop size={32} />,
  accessories: <FaHeadphones size={32} />,
  keyboards: <FaRegKeyboard size={32} />,
};

const HomePage = async () => {
  const [categories, products]: [Category[], Product[]] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-5 sm:py-7">
      <section className="mx-auto max-w-5xl rounded-2xl bg-indigo-100 px-4 py-12 text-center sm:px-6 sm:py-16">
        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
          Everything You Need, All in One Place
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm text-muted sm:text-base">
          Explore quality products and find your next favorite today.
        </p>

        <Link
          href="/products"
          className="mt-7 inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-hover"
        >
          Shop Now
        </Link>
      </section>

      <section className="mx-auto max-w-5xl px-0 py-8 sm:px-2 sm:py-10">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold sm:text-2xl">Categories</h2>

          <Link
            href="/categories"
            className="shrink-0 text-sm text-primary hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((category: Category) => (
            <Link
              key={category.id}
              href={`/products?category=${encodeURIComponent(category.slug)}`}
              className="rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:shadow-lg sm:p-5"
            >
              <div className="mb-4 flex items-center justify-center rounded-2xl bg-primary/10 p-5 text-primary sm:p-6">
                {categoryIcons[category.slug] ?? <FaTag size={32} />}
              </div>

              <h3 className="text-lg font-bold text-foreground sm:text-xl">
                {category.name}
              </h3>

              <p className="mt-2 text-sm text-muted">
                Explore products in this category
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-0 pb-10 sm:px-2 sm:pb-14">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold sm:text-2xl">Featured Products</h2>

          <Link
            href="/products"
            className="shrink-0 text-sm text-primary hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product: Product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
