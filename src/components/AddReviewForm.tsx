"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { toast } from "react-toastify";

type AddReviewFormProps = {
  productId: number;
};

const AddReviewForm = ({ productId }: AddReviewFormProps) => {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please choose a rating");
      return;
    }
    if (comment === "") {
      toast.error("Please write something");
      return;
    }
    try {
      await axios.post(`${DOMAIN}/api/reviews`, { productId, comment, rating });
      router.refresh();
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "something went wrong");
        console.log(error);
        setComment("");
      }
    }
  };
  return (
    <form onSubmit={formSubmitHandler} className="mb-7 flex flex-col gap-3">
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary sm:w-fit sm:min-w-40"
      >
        <option value={0}>Choose rating</option>
        <option value={1}>1 ⭐</option>
        <option value={2}>2 ⭐</option>
        <option value={3}>3 ⭐</option>
        <option value={4}>4 ⭐</option>
        <option value={5}>5 ⭐</option>
      </select>

      <textarea
        rows={5}
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full resize-y rounded-lg border border-border bg-background p-3 text-sm leading-6 text-foreground outline-none focus:ring-2 focus:ring-primary sm:text-base"
      />

      <button
        type="submit"
        className="mt-1 w-full rounded-lg bg-primary px-5 py-3 text-base font-semibold text-white transition hover:bg-primary-hover sm:w-fit"
      >
        Review
      </button>
    </form>
  );
};

export default AddReviewForm;
