import { getProducts } from "@/apiCalls/productApiCalls";
import ProductItem from "@/components/ProductItem";
import { Product } from "@/utils/types";
import { error } from "console";
import React from "react";

const ProductPage = async () => {
  const products: Product[] = await getProducts();
  console.log(error)
  return (
    <section className="m-auto px-5">
      <div className="flex items-center justify-center flex-wrap gap-5">
        {products.map((item) => (
          <ProductItem product={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default ProductPage;
