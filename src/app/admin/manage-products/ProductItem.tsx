"use client";

import { Product } from "@/utils/types";
import React, { useState } from "react";
import DeleteProdcut from "./DeleteProdcut";
import UpdateProduct from "./UpdateProduct";

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-between bg-card rounded-lg gap-4 p-4 shadow-sm">
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold">{`${product.name} (#${product.id})`}</h3>
        <p className="text-muted text-sm">{product.stock}</p>
        <p className="text-muted text-sm">price: {product.price}$</p>
        <p className="text-muted text-sm">slug: {product.slug}</p>
        <p className="text-muted text-sm">categoryId: {product.categoryId}</p>
        <p className="mt-1 text-sm text-muted">
          createdAt:{" "}
          {new Date(product.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
        <p className="mt-1 text-sm text-muted">
          updatedAt:{" "}
          {new Date(product.updatedAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md border border-border bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Update
          </button>

          <DeleteProdcut productId={product.id} />
        </div>
        {open && <UpdateProduct setOpen={setOpen} product={product} />}
      </div>
      <img
        src={`/images/${product.image}`}
        alt={product.name}
        className="h-40 w-60 shrink-0 rounded-md object-cover"
      />
    </div>
  );
};

export default ProductItem;
