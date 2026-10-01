"use client";

import { DOMAIN } from "@/utils/constants";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type AddToCartButtonProps = {
  productId: number;
};

const AddToCartButton = ({ productId }: AddToCartButtonProps) => {
  const router = useRouter();
  const AddCartHandler = async () => {
    try {
      await axios.post(`${DOMAIN}/api/cart`, { productId, quantity: 1 });
      toast.success("Procut added to cart");
      router.refresh();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
      console.log(error);
    }
  };
  return (
    <button
      onClick={AddCartHandler}
      className="w-fit rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary-hover"
    >
      Add to cart
    </button>
  );
};

export default AddToCartButton;
