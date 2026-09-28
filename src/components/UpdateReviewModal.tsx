import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

type UpdateReviewModalProps = {
  reviewId: number;
  comment: string | null;
  rating: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const UpdateReviewModal = ({
  reviewId,
  comment,
  rating,
  setOpen,
}: UpdateReviewModalProps) => {
  const router = useRouter();
  const [updateComment, setUpdateComment] = useState(comment ?? "");
  const [updateRating, setUpdateRating] = useState(rating);

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (updateComment === "") {
      toast.error("Please write something");
      return;
    }

    if (updateRating === 0) {
      toast.error("Please choose a rating");
      return;
    }

    try {
      await axios.put(`${DOMAIN}/api/reviews/${reviewId}`, {
        comment: updateComment,
        rating: updateRating,
      });

      router.refresh();
      setUpdateComment("");
      setUpdateRating(0);
      setOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Something went wrong"
        );
        console.log(error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-xl rounded-xl border border-border bg-card p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Edit Review
          </h2>

          <IoMdCloseCircleOutline
            onClick={() => setOpen(false)}
            className="cursor-pointer text-2xl text-muted hover:text-foreground"
          />
        </div>

        <form onSubmit={formSubmitHandler} className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Comment
            </label>

            <textarea
              rows={5}
              value={updateComment}
              onChange={(e) => setUpdateComment(e.target.value)}
              className="w-full rounded-lg border border-border bg-background p-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Rating
            </label>

            <select
              value={updateRating}
              onChange={(e) => setUpdateRating(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-background p-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value={0}>Choose rating</option>
              <option value={1}>1 ⭐</option>
              <option value={2}>2 ⭐</option>
              <option value={3}>3 ⭐</option>
              <option value={4}>4 ⭐</option>
              <option value={5}>5 ⭐</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-2.5 font-medium text-white hover:bg-primary-hover"
          >
            Update Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateReviewModal;