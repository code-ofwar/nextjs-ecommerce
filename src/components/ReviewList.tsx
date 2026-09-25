import { ReviewWithUser } from "@/utils/types";

type ReviewListProps = {
  reviews: ReviewWithUser[];
};

const ReviewList = ({ reviews }: ReviewListProps) => {
  if (reviews.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-muted">No reviews yet.</p>
      </div>
    );
  }

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
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
