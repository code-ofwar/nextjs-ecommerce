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
    <div className="flex flex-col gap-3 p-1 sm:gap-4 sm:p-2">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-xl border border-border bg-card p-3 sm:p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="min-w-0 break-words text-sm font-semibold sm:text-base">
              {review.user.name}
            </h3>

            <span
              className="shrink-0 text-sm text-yellow-500 sm:text-base"
              aria-label={`Rating: ${review.rating} out of 5`}
            >
              {"★".repeat(review.rating)}
            </span>
          </div>

          {review.comment && (
            <p className="mt-3 break-words text-sm leading-6 text-muted sm:text-base">
              {review.comment}
            </p>
          )}

          <div className="mt-3 flex items-center justify-end gap-4">
            {userId && userId === review.userId && (
              <FaEdit
                onClick={() => setOpen(true)}
                className="cursor-pointer text-lg text-green-600 sm:text-xl"
              />
            )}

            {userId && (userId === review.userId || isAdmin) && (
              <FaTrash
                onClick={() => ReviewDeleteHandler(review.id)}
                className="cursor-pointer text-lg text-red-600 sm:text-xl"
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
