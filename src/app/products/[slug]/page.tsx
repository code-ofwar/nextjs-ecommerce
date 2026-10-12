import { getSingleProduct } from "@/apiCalls/productApiCalls";
import AddReviewForm from "@/components/AddReviewForm";
import AddToCartButton from "@/components/AddToCartButton";
import ReviewList from "@/components/ReviewList";
import { SingleProduct, singleSlugParamsProps } from "@/utils/types";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: singleSlugParamsProps): Promise<Metadata> {
  const { slug } = await params;
  const product: SingleProduct = await getSingleProduct(slug);

  return {
    title: product.name,
    description:
      product.description || "Discover quality products at KSP SHOP.",
    openGraph: {
      title: product.name,
      description:
        product.description || "Discover quality products at KSP SHOP.",
      images: [`/images/${product.image}`],
      type: "website",
    },
  };
}

const DetailsPage = async ({ params }: singleSlugParamsProps) => {
  const { slug } = await params;
  const product: SingleProduct = await getSingleProduct(slug);

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
    <main className="w-full bg-background px-4 py-6 text-foreground sm:px-6 sm:py-8">
      <section className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-start md:gap-8">
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-border md:mx-0 md:flex-1">
          <Image
            src={`/images/${product.image}`}
            alt={product.name}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1152px) 50vw, 448px"
            className="object-cover"
          />
        </div>

        <div className="flex w-full flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:p-6 md:flex-1">
          <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {product.category.name}
          </span>

          <h1 className="text-2xl font-bold md:text-3xl">{product.name}</h1>

          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold">{averageRating.toFixed(1)}</span>
            <span className="text-muted">({reviewCount} reviews)</span>
          </div>

          <p className="text-sm leading-6 text-muted sm:text-base">
            {product.description || "No description available."}
          </p>

          <p className="text-2xl font-bold text-primary">${product.price}</p>

          <p className="text-sm text-muted">Stock: {product.stock}</p>

          <AddToCartButton productId={product.id} />
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto mt-8 max-w-4xl rounded-2xl border border-border bg-card p-4 sm:mt-10 sm:p-6">
        <h2 className="mb-5 text-xl font-bold sm:text-2xl">
          Reviews ({reviewCount})
        </h2>

        {payload ? (
          <AddReviewForm productId={product.id} />
        ) : (
          <p className="mb-5 rounded-lg bg-background p-3 text-sm font-medium text-red-500 sm:text-base">
            Login first to review
          </p>
        )}

        <ReviewList
          reviews={product.reviews}
          userId={payload?.id}
          isAdmin={payload?.isAdmin}
        />
      </section>
    </main>
  );
};

export default DetailsPage;
