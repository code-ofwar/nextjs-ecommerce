import ProductForm from "@/components/admin/ProductForm";
import React from "react";

const AdminPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-5">
      <div className="shadow p-4 bg-purple-200 w-full">
        <h2 className="text-xl lg:text-2xl font-semibold text-muted  mb-4">
          Add new product
        </h2>
        <ProductForm />
      </div>
    </div>
  );
};

export default AdminPage;
