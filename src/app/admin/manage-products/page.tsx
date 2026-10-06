import { getProducts } from "@/apiCalls/productApiCalls";
import { Product } from "@/utils/types";
import React from "react";
import ProductItem from "./ProductItem";

const ManageProductsPage = async () => {
  const products: Product[] = await getProducts();

  return (
    <section className="mx-auto max-w-5xl px-5 py-8">
      <h1 className="mb-6 text-2xl font-bold">Manage products</h1>
      <div className="space-y-6 max-w-3xl m-auto">
        {products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
};

export default ManageProductsPage;
