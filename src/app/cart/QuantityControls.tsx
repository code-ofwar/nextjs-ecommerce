"use client";

import { DOMAIN } from "@/utils/constants";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type QuantityControlsProps = {
  quantity: number;
  productId: number;
};

const QuantityControls = ({ productId, quantity }: QuantityControlsProps) => {
  const router = useRouter();
  const currentQuantity = quantity;

  const updateQuantity = async (newQuantity: number) => {
    try {
      await axios.put(`${DOMAIN}/api/cart`, {
        productId,
        quantity: newQuantity,
      });
      router.refresh();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "something went wrong");
      }
      console.log(error);
    }
  };

  return (
    <div className="flex items-center overflow-hidden rounded-lg border border-border bg-background">
      <button
        onClick={() => updateQuantity(currentQuantity - 1)}
        disabled={currentQuantity === 1}
        className="flex h-9 w-9 items-center justify-center text-lg font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>

      <span className="flex h-9 min-w-10 items-center justify-center border-x border-border px-3 text-sm font-semibold">
        {currentQuantity}
      </span>

      <button
        onClick={() => updateQuantity(currentQuantity + 1)}
        className="flex h-9 w-9 items-center justify-center text-lg font-medium transition hover:bg-muted"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControls;
