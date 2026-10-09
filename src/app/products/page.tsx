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
    <section className="px-5 py-7">
      <div className="max-w-5xl m-auto mb-4 px-5">
        <h1 className="text-2xl font-bold text-foreground">
          Our Products
        </h1>

        <p className="mb-6 text-sm text-muted">Browse our collection</p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/products"
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
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
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                category === item.slug
                  ? "bg-primary text-white"
                  : "bg-border text-foreground hover:opacity-80"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-5">
        {products.map((item) => (
          <ProductItem product={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default ProductPage;
