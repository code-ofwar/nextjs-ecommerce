"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "react-toastify";

type DeletCartItemProps = {
  productId: number;
};

const DeleteCartItem = ({ productId }: DeletCartItemProps) => {
  const router = useRouter();
  const deleteSubmitHandler = async () => {
    try {
      if (confirm("delete the cart, are you sure?")) {
        await axios.delete(`${DOMAIN}/api/cart`, { data: { productId } });
        router.refresh();
        toast.success("Cart deleted succsessfuly");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "something went wrong");
        console.log(error);
      }
    }
  };
  return (
    <button
      onClick={deleteSubmitHandler}
      className="rounded-lg border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/10"
    >
      Remove
    </button>
  );
};

export default DeleteCartItem;
