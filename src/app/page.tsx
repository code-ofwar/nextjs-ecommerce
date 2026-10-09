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
    <main className="mx-auto max-w-7xl px-5 py-7">
      <section className="rounded-2xl px-5 py-14 bg-indigo-200 max-w-5xl m-auto text-center">
        <h1 className="text-5xl font-bold ">Find Your Next Favorite</h1>
        <p className="mx-auto max-w-xl mt-4 text-muted">
          Discover quality products and enjoy a simple shopping experience.
        </p>
        <Link
          href="/products"
          className="mt-7 inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-hover"
        >
          Shop Now
        </Link>
      </section>

      <section className="py-10 px-5 max-w-5xl m-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Link
            href="/categories"
            className="text-sm text-primary hover:underline"
          >
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.slice(0, 4).map((category: Category) => (
            <Link
            key={category.id}
            href={`/products?category=${encodeURIComponent(category.slug)}`}
            className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 flex items-center justify-center rounded-2xl bg-primary/10 p-6 text-primary">
              {categoryIcons[category.slug] ?? <FaTag size={32} />}
            </div>

            <h2 className="text-xl font-bold text-foreground">
              {category.name}
            </h2>

            <p className="mt-2 text-sm text-muted">
              Explore products in this category
            </p>
          </Link>
          ))}
        </div>
      </section>

       <section className="pb-14 px-5 max-w-5xl m-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link
            href="/products"
            className="text-sm text-primary hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product: Product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
