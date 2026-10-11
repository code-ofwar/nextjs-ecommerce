import ProductForm from "@/components/admin/ProductForm";
import React from "react";

const AdminPage = () => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-5 sm:py-8">
      <div className="w-full rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground sm:text-2xl">
          Add new product
        </h2>

        <ProductForm />
      </div>
    </div>
  );
};

export default AdminPage;
