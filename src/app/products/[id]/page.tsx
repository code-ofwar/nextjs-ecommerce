import { getSingleProduct } from "@/apiCalls/productApiCalls";
import AddReviewForm from "@/components/AddReviewForm";
import AddToCartButton from "@/components/AddToCartButton";
import ReviewList from "@/components/ReviewList";
import { singleParamsProps, SingleProduct } from "@/utils/types";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import Image from "next/image";

const DetailsPage = async ({ params }: singleParamsProps) => {
  const { id } = await params;
  const product: SingleProduct = await getSingleProduct(id);

  const reviewCount = product.reviews.length;

  const averageRating =
    reviewCount > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviewCount
      : 0;

  const cookieSotre = await cookies();
  const token = cookieSotre.get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  return (
    <section className="w-full bg-background p-4 text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row">
        <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-lg bg-border">
          <Image
            src={
            `/images/${product.image}`}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 rounded-lg bg-card p-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-2">
            <span className="text-yellow-500">★</span>

            <span className="font-semibold">{averageRating.toFixed(1)}</span>

            <span className="text-muted">({reviewCount} reviews)</span>
          </div>

          <p className="text-muted">{product.description}</p>

          <p className="text-2xl font-bold">${product.price}</p>

          <p className="text-muted">Stock: {product.stock}</p>

          <AddToCartButton productId={product.id} />
        </div>
      </div>
      <div className="mx-auto mt-5 max-w-3xl bg-card">
        <h2 className="mb-5 text-2xl font-bold p-2">Reviews ({reviewCount})</h2>
        {payload ? (
          <AddReviewForm productId={product.id} />
        ) : (
          <p className="p-2 text-red-500 font-medium">Login first to review</p>
        )}
        <ReviewList
          reviews={product.reviews}
          userId={payload?.id}
          isAdmin={payload?.isAdmin}
        />
      </div>
    </section>
  );
};

export default DetailsPage;
