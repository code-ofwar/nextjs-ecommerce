import { db } from "@/prisma/db";
import { updateProductDto } from "@/utils/dtos";
import { singleParamsProps } from "@/utils/types";
import { updateProductSchema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ params }: singleParamsProps) {
  try {
    const { id } = await params;

    const product = await db.orm.public.Product.first({ id: parseInt(id) });
    if (!product) {
      return NextResponse.json(
        { message: "product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ product }, { status: 200 });
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
    const product = await db.orm.public.Product.first({ id: parseInt(id) });
    if (!product) {
      return NextResponse.json(
        { message: "product not found" },
        { status: 404 },
      );
    }

    const body = (await request.json()) as updateProductDto;

    const validation = updateProductSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "validation failed", errors: validation.error.issues },
        { status: 400 },
      );
    }

    const updateProduct = await db.orm.public.Product.where({
      id: parseInt(id),
    }).update(validation.data);

    return NextResponse.json({ updateProduct }, { status: 200 });
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
        { message: "only admin, access denied" },
        { status: 403 },
      );
    }

    const { id } = await params;
    
    const product = await db.orm.public.Product.first({
      id: parseInt(id),
    });
    if (!product) {
      return NextResponse.json(
        { message: "product not found" },
        { status: 404 },
      );
    }

    await db.orm.public.Product.where({
      id: parseInt(id),
    }).delete();

    return NextResponse.json({ message: "product deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
