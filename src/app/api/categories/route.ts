import { db } from "@/prisma/db";
import { CreateCategoryDto } from "@/utils/dtos";
import { createCategorySchema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const caterogries = await db.orm.public.Category.all();
    return NextResponse.json({ caterogries }, { status: 200 });
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

    const body = (await request.json()) as CreateCategoryDto;

    const validation = createCategorySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "validation failed" },
        { status: 400 },
      );
    }

    const { name, slug } = validation.data;

    const newCategory = await db.orm.public.Category.create({ name, slug });

    return NextResponse.json(
      { newCategory, message: "category created" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
