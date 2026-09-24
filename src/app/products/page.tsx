import { getProducts } from "@/apiCalls/productApiCalls";
import ProductItem from "@/components/ProductItem";
import { Product } from "@/utils/types";
import React from "react";

const ProductPage = async () => {
  const produts: Product[] = await getProducts();
  return (
    <section className="m-auto px-5">
      <div className="flex items-center justify-center flex-wrap gap-5">
        {produts.map((item) => (
          <ProductItem product={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default ProductPage;
