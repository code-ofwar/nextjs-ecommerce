import { db } from "@/prisma/db";
import { singleSlugParamsProps } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: singleSlugParamsProps,
) {
  try {
    const { slug } = await params;
    console.log("Received slug:", slug);

    const product = await db.orm.public.Product.where({ slug })
      .include("reviews", (review) =>
        review.include("user", (user) => user.select("id", "name")),
      )
      .include("category")
      .first();
    console.log("Found product:", product);

    if (!product) {
      return NextResponse.json(
        { message: "product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
