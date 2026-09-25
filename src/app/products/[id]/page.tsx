import { getSingleProduct } from "@/apiCalls/productApiCalls";
import ReviewList from "@/components/ReviewList";
import { singleParamsProps, SingleProduct } from "@/utils/types";
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
  return (
    <section className="w-full bg-background p-4 text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row">
        <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg bg-border">
          <Image
            src={
              product.image?.startsWith("/")
                ? product.image
                : "/images/no-image.jpg"
            }
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

          <button className="w-fit rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary-hover">
            Add to cart
          </button>
        </div>
      </div>
      <div className="mx-auto mt-5 max-w-3xl bg-card">
        <h2 className="mb-5 text-2xl font-bold p-2">Reviews ({reviewCount})</h2>

        <ReviewList reviews={product.reviews} />
      </div>
    </section>
  );
};

export default DetailsPage;
