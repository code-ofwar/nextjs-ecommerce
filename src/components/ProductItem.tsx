import { Product } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="group w-full max-w-xs overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-border">
        <Image
          src={`/images/${product.image}`}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="line-clamp-1 text-lg font-bold text-foreground">
            {product.name}
          </h2>

          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            {product.category.name}
          </span>
        </div>

        <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-5 text-muted">
          {product.description || "No description available."}
        </p>

        <div className="flex items-center justify-between gap-3">
          <span className="text-xl font-bold text-primary">
            ${product.price}
          </span>

          <Link
            href={`/products/${product.slug}`}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover active:scale-95"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
