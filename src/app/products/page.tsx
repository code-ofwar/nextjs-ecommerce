import { getCategories } from "@/apiCalls/categoryApiCalls";
import { getProducts } from "@/apiCalls/productApiCalls";
import ProductItem from "@/components/ProductItem";
import { Category, Product } from "@/utils/types";
import Link from "next/link";

type ProductPageProps = {
  searchParams: Promise<{ category?: string }>;
};

const ProductPage = async ({ searchParams }: ProductPageProps) => {
  const { category } = await searchParams;
  const products: Product[] = await getProducts(category);
  const categories: Category[] = await getCategories();

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-5 sm:py-7">
      {/* Header and Categories */}
      <section className="mx-auto mb-8 max-w-5xl">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Our Products
        </h1>

        <p className="mb-5 mt-2 text-sm text-muted sm:mb-6">
          Browse our collection
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Link
            href="/products"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 sm:py-2.5 ${
              !category
                ? "bg-primary text-white"
                : "bg-border text-foreground hover:opacity-80"
            }`}
          >
            All Products
          </Link>

          {categories.map((item) => (
            <Link
              key={item.id}
              href={`/products?category=${encodeURIComponent(item.slug)}`}
              className={`rounded-full  px-4 py-2 text-sm font-medium transition-colors sm:px-5 sm:py-2.5 ${
                category === item.slug
                  ? "bg-primary text-white"
                  : "bg-border text-foreground hover:opacity-80"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((item: Product) => (
          <ProductItem product={item} key={item.id} />
        ))}
      </section>
    </main>
  );
};

export default ProductPage;
