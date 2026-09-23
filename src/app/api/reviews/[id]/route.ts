import { db } from "@/prisma/db";
import { UpdateReviewDto } from "@/utils/dtos";
import { singleParamsProps } from "@/utils/types";
import { updateReviewSchema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: singleParamsProps) {
  try {
    const { id } = await params;
    const parseId = parseInt(id);
    const review = await db.orm.public.Review.first({ id: parseId });
    if (!review) {
      return NextResponse.json(
        { message: "review not found" },
        { status: 404 },
      );
    }

    const user = verifyToken(request);
    if (!user || user.id !== review.userId) {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 },
      );
    }
    const body = (await request.json()) as UpdateReviewDto;

    const validation = updateReviewSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.error.issues },
        { status: 400 },
      );
    }

    const { comment, rating } = validation.data;

    const updateReview = await db.orm.public.Review.where({
      id: parseId,
    }).update({
      comment,
      rating,
    });
    return NextResponse.json(updateReview, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: singleParamsProps,
) {
  try {
    const { id } = await params;
    const parseId = parseInt(id);
    const review = await db.orm.public.Review.first({ id: parseId });
    if (!review) {
      return NextResponse.json(
        { message: "review not found" },
        { status: 404 },
      );
    }

    const user = verifyToken(request);
    if (user === null) {
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 },
      );
    }

    if (!user.isAdmin && user.id !== review.userId) {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 },
      );
    }

    await db.orm.public.Review.where({ id: parseId }).delete();

    return NextResponse.json(
      { message: "Review deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
