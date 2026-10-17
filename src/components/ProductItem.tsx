import { Product } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="group w-full max-w-xs overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-card">
        <Image
          src={`/images/${product.image}`}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="line-clamp-2 text-base font-bold text-foreground sm:text-lg">
            {product.name}
          </h2>

          <span className="w-fit shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            {product.category.name}
          </span>
        </div>

        <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-5 text-muted">
          {product.description || "No description available."}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-lg font-bold text-primary sm:text-xl">
            ${product.price}
          </span>

          <Link
            href={`/products/${product.slug}`}
            className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover active:scale-95 sm:px-4"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
