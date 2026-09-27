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
    if (rating === 0) {
      toast.error("Please choose a rating");
      return;
    }
    if (comment === "") {
      toast.error("Please write something");
      return;
    }
    e.preventDefault();
    try {
      await axios.post(`${DOMAIN}/api/reviews`, { productId, comment, rating });
      router.refresh();
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message) || "something went wrong";
        console.log(error);
        setComment("");
      }
    }
  };
  return (
    <form onSubmit={formSubmitHandler} className="mb-7">
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
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
        className="rounded-lg text-xl p-2 w-full bg-background focus:shadow-md "
      />
      <button
        type="submit"
        className="bg-primary mt-1 text-white p-2 w-min text-xl rounded-lg hover:bg-primary-hover"
      >
        Review
      </button>
    </form>
  );
};

export default AddReviewForm;
