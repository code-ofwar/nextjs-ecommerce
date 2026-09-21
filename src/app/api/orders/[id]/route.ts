import { db } from "@/prisma/db";
import { UpdateOrderDto } from "@/utils/dtos";
import { singleParamsProps } from "@/utils/types";
import { updateOrderSchema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: singleParamsProps) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized, Login first" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const parseId = parseInt(id);

    const order = await db.orm.public.Order.first({
      id: parseId,
      userId: user.id,
    });
    if (!order) {
      return NextResponse.json({ message: "order not found" }, { status: 404 });
    }

    const items = [];

    const orderItem = await db.orm.public.OrderItem.where({
      orderId: order.id,
    }).all();
    if (orderItem.length === 0) {
      return NextResponse.json({ message: "cart not found" }, { status: 404 });
    }

    for (const item of orderItem) {
      const product = await db.orm.public.Product.first({
        id: item.productId,
      });

      items.push({
        orderId: item.orderId,
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        product,
      });
    }

    return NextResponse.json({ order, items }, { status: 200 });
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

    const body = (await request.json()) as UpdateOrderDto;
    const validation = updateOrderSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "validation failed" },
        { status: 400 },
      );
    }

    const { id } = await params;
    const parseId = parseInt(id);
    const { status } = validation.data;

    const order = await db.orm.public.Order.first({ id: parseId });
    if (!order) {
      return NextResponse.json({ message: "order not found" }, { status: 404 });
    }

    await db.orm.public.Order.where({ id: parseId }).update({ status });

    return NextResponse.json({ message: "order updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
