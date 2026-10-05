import React from "react";

const AddProdcutMessage = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
      <h2 className="text-xl font-semibold">Your cart is empty</h2>
      <p className="mt-2 text-sm text-muted">
        Add some products to your cart to continue shopping.
      </p>
    </div>
  );
};

export default AddProdcutMessage;
