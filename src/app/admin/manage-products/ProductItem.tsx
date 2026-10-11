"use client";

import { Product } from "@/utils/types";
import React, { useState } from "react";
import DeleteProdcut from "./DeleteProdcut";
import UpdateProduct from "./UpdateProduct";
import Link from "next/link";
import { DOMAIN } from "@/utils/constants";

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col-reverse gap-4 rounded-xl border border-border bg-card p-3 shadow-sm sm:flex-row sm:items-start sm:gap-4 sm:p-4">
      <div className="min-w-0 flex-1">
        <h3 className="break-words font-semibold">
          {`${product.name} (#${product.id})`}
        </h3>

        <p className="mt-2 text-sm text-muted">Stock: {product.stock}</p>
        <p className="text-sm text-muted">Price: {product.price}$</p>
        <p className="break-words text-sm text-muted">Slug: {product.slug}</p>
        <p className="break-words text-sm text-muted">
          Category ID: {product.categoryId}
        </p>

        <p className="mt-2 break-words text-xs text-muted sm:text-sm">
          Created:{" "}
          {new Date(product.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>

        <p className="mt-1 break-words text-xs text-muted sm:text-sm">
          Updated:{" "}
          {new Date(product.updatedAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md border border-border bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover sm:px-4"
          >
            Update
          </button>

          <DeleteProdcut productId={product.id} />

          <Link
            href={`${DOMAIN}/products/${product.id}`}
            className="rounded-md border border-border bg-foreground px-3 py-2 text-sm font-medium text-white transition-colors hover:opacity-80 sm:px-4"
          >
            Manage Reviews (admin)
          </Link>
        </div>

        {open && <UpdateProduct setOpen={setOpen} product={product} />}
      </div>

      <img
        src={`/images/${product.image}`}
        alt={product.name}
        className="h-44 w-full shrink-0 rounded-lg object-cover sm:h-40 sm:w-48 md:w-60"
      />
    </div>
  );
};

export default ProductItem;
