import { db } from "@/prisma/db";
import { UpdateCategoryDto } from "@/utils/dtos";
import { singleParamsProps } from "@/utils/types";
import { updateCategorySchema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: singleParamsProps) {
  try {
    const { id } = await params;
    const parseId = parseInt(id);
    const category = await db.orm.public.Category.first({ id: parseId });

    if (!category) {
      return NextResponse.json(
        { message: "category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {

    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: singleParamsProps) {
  try {
    const user = verifyToken(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 },
      );
    }

    const { id } = await params;
    const category = await db.orm.public.Category.first({ id: parseInt(id) });
    if (!category) {
      return NextResponse.json(
        { message: "category not found" },
        { status: 404 },
      );
    }

    const body = (await request.json()) as UpdateCategoryDto;

    const validation = updateCategorySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "validation failed" },
        { status: 400 },
      );
    }
    const updateCategory = await db.orm.public.Category.where({
      id: parseInt(id),
    }).update(validation.data);

    return NextResponse.json({ updateCategory }, { status: 200 });
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
    const user = verifyToken(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "only admin access denied" },
        { status: 403 },
      );
    }

    const { id } = await params;

    const category = await db.orm.public.Category.first({ id: parseInt(id) });
    if (!category) {
      return NextResponse.json(
        { message: "category not found" },
        { status: 404 },
      );
    }

    const deleteCategory = await db.orm.public.Category.where({
      id: parseInt(id),
    }).delete();

    return NextResponse.json({ deleteCategory }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
