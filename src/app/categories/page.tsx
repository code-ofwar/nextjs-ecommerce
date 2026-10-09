import { getCategories } from "@/apiCalls/categoryApiCalls";
import { Category } from "@/utils/types";
import Link from "next/link";
import {
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaRegKeyboard,
  FaTag,
} from "react-icons/fa";

const categoryIcons: Record<string, React.ReactNode> = {
  phones: <FaMobileAlt size={32} />,
  laptops: <FaLaptop size={32} />,
  accessories: <FaHeadphones size={32} />,
   keyboards: <FaRegKeyboard size={32} />,
};

const CategoriesPage = async () => {
  const categories: Category[] = await getCategories();

  return (
    <section className="mx-auto max-w-5xl px-5 py-7">
      <h1 className="mb-2 text-2xl font-bold text-foreground">Categories</h1>

      <p className="mb-8 text-sm text-muted">Explore our product categories</p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
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
  );
};

export default CategoriesPage;
