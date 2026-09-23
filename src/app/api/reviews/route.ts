import { db } from "@/prisma/db";
import { CreateReviewDto } from "@/utils/dtos";
import { createReviewSchema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "Only logged in user, access denied" },
        { status: 401 },
      );
    }

    const body = (await request.json()) as CreateReviewDto;
    const validation = createReviewSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validation.error.issues,
        },
        { status: 400 },
      );
    }

    const { comment, productId, rating } = validation.data;

    const product = await db.orm.public.Product.first({ id: productId });
    if (!product) {
      return NextResponse.json(
        { message: "product not found" },
        { status: 404 },
      );
    }

    const existingReview = await db.orm.public.Review.first({
      userId: user.id,
      productId,
    });
    if (existingReview) {
      return NextResponse.json(
        { message: "you have already reviewed this product" },
        { status: 409 },
      );
    }

    const newReview = await db.orm.public.Review.create({
      userId: user.id,
      comment,
      rating,
      productId,
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 },
      );
    }

    const reviews = await db.orm.public.Review.all();

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
