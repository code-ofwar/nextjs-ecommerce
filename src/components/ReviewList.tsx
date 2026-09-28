"use client";

import { DOMAIN } from "@/utils/constants";
import { ReviewWithUser } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import UpdateReviewModal from "./UpdateReviewModal";

type ReviewListProps = {
  reviews: ReviewWithUser[];
  userId?: number;
  isAdmin?: boolean;
};

const ReviewList = ({ reviews, userId, isAdmin }: ReviewListProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  if (reviews.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-muted">No reviews yet.</p>
      </div>
    );
  }

  const ReviewDeleteHandler = async (reviewId: number) => {
    try {
      if (confirm("You sure you want delete your review?")) {
        await axios.delete(`${DOMAIN}/api/reviews/${reviewId}`);
        router.refresh();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 p-1">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-lg border border-border bg-card p-5"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{review.user.name}</h3>

            <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
          </div>

          {review.comment && (
            <p className="mt-3 text-muted">{review.comment}</p>
          )}
          <div className="flex justify-end items-center">
            {userId && userId === review.userId && (
              <FaEdit
                onClick={() => setOpen(true)}
                className="text-green-600 text-xl cursor-pointer me-3"
              />
            )}
            {userId && (userId === review.userId || isAdmin) && (
              <FaTrash
                onClick={() => ReviewDeleteHandler(review.id)}
                className="text-red-600 text-xl cursor-pointer"
              />
            )}
          </div>
          {open && (
            <UpdateReviewModal
              setOpen={setOpen}
              reviewId={review.id}
              comment={review.comment}
              rating={review.rating}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
