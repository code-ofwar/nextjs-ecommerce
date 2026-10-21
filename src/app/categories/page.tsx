import { getCategories } from "@/apiCalls/categoryApiCalls";
import { Category } from "@/utils/types";
import { Metadata } from "next";
import Link from "next/link";
import {
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaRegKeyboard,
  FaTag,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Explore product categories at KSP SHOP and find the products you need.",
};

const categoryIcons: Record<string, React.ReactNode> = {
  phones: <FaMobileAlt size={32} />,
  laptops: <FaLaptop size={32} />,
  accessories: <FaHeadphones size={32} />,
  keyboards: <FaRegKeyboard size={32} />,
};

const CategoriesPage = async () => {
  const categories: Category[] = await getCategories();

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-5 sm:py-8">
      <h1 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">
        Categories
      </h1>

      <p className="mb-6 text-sm text-muted sm:mb-8">
        Explore our product categories
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${encodeURIComponent(category.slug)}`}
            className="rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
          >
            <div className="mb-4 flex items-center justify-center rounded-2xl bg-primary/10 p-5 text-primary sm:mb-5 sm:p-6">
              {categoryIcons[category.slug] ?? <FaTag size={32} />}
            </div>

            <h2 className="wrap-break-word text-lg font-bold text-foreground sm:text-xl">
              {category.name}
            </h2>

            <p className="mt-2 text-sm leading-5 text-muted">
              Explore products in this category
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
