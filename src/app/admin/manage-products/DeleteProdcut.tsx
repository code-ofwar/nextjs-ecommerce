"use client"

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "react-toastify";

type DeleteProdcutProps = {
  productId: number;
};

const DeleteProdcut = ({ productId }: DeleteProdcutProps) => {
  const router = useRouter();
  const deleteProductHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (confirm("You want to delete this product, are you sure?")) {
        await axios.delete(`${DOMAIN}/api/products/${productId}`);
        router.refresh();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
        console.log(error);
      }
    }
  };
  return (
    <button
      onClick={deleteProductHandler}
      className="rounded-md border border-border bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
    >
      Delete
    </button>
  );
};

export default DeleteProdcut;
