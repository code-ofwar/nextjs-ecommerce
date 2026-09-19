import { db } from "@/prisma/db";
import { CreateProductDto } from "@/utils/dtos";
import { createProductSchema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await db.orm.public.Product.all();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 },
      );
    }

    const body = (await request.json()) as CreateProductDto;

    const validation = createProductSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "validation failed", errors: validation.error.issues },
        { status: 400 },
      );
    }
    const { name, description, slug, image, price, stock, categoryId } =
      validation.data;
    const newProduct = await db.orm.public.Product.create({
      name,
      description,
      slug,
      image,
      price,
      stock,
      categoryId,
    });

    return NextResponse.json(
      { newProduct, message: "new product created" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
