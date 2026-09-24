import { Product } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

type ProductMap = {
  product: Product;
};

const ProductItem = ({ product }: ProductMap) => {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="relative aspect-square">
        {/* <Image
          src={product.image || "/images/no-image.jpg"}
          alt={product.name}
          fill
          className="object-cover"
        /> */}
        <span className="flex h-full items-center justify-center text-gray-500">
          No Image
        </span>
      </div>

      <div className="p-4">
        <h2 className="mb-2 text-lg font-semibold text-foreground">
          {product.name}
        </h2>

        <p className="mb-3 line-clamp-2 text-sm text-muted">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${product.price}
          </span>

          <Link
            href={`/products/${product.id}`}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
