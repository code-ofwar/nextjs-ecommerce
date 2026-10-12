import { getProducts } from "@/apiCalls/productApiCalls";
import { Product } from "@/utils/types";
import React from "react";
import ProductItem from "./ProductItem";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Products",
  description: "Manage products in KSP SHOP.",
  robots: {
    index: false,
    follow: false,
  },
};

const ManageProductsPage = async () => {
  const products: Product[] = await getProducts();

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-5 sm:py-8">
      <h1 className="mb-5 text-xl font-bold sm:mb-6 sm:text-2xl">
        Manage products
      </h1>

      <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6">
        {products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
};

export default ManageProductsPage;
