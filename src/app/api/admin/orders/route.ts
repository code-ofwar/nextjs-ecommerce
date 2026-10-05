import { db } from "@/prisma/db";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);

    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 },
      );
    }

    const orders = await db.orm.public.Order.all();

    const ordersWithItems = [];

    for (const order of orders) {
      const orderItems = await db.orm.public.OrderItem.where({
        orderId: order.id,
      })
        .include("product")
        .all();

      ordersWithItems.push({
        order,
        orderItems,
      });
    }

    return NextResponse.json({ orders: ordersWithItems }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
