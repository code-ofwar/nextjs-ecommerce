import { db } from "@/prisma/db";
import { CreateOrderDto } from "@/utils/dtos";
import { createOrderSchema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized, Login first" },
        { status: 401 },
      );
    }

    const body = (await request.json()) as CreateOrderDto;

    const validation = createOrderSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "validation failed", errors: validation.error.issues },
        { status: 400 },
      );
    }

    const { fullName, phone, country, city, address, postalCode } =
      validation.data;

    const cart = await db.orm.public.Cart.first({ userId: user.id });
    if (!cart) {
      return NextResponse.json({ message: "cart not found" }, { status: 404 });
    }

    const cartItems = await db.orm.public.CartItem.where({
      cartId: cart.id,
    }).all();

    if (cartItems.length === 0) {
      return NextResponse.json({ message: "cart is empty" }, { status: 400 });
    }

    let totalPrice = 0;

    type CartProduct = {
      item: (typeof cartItems)[number];
      product: NonNullable<
        Awaited<ReturnType<typeof db.orm.public.Product.first>>
      >;
    };

    const cartProducts: CartProduct[] = [];
    for (const item of cartItems) {
      const product = await db.orm.public.Product.first({ id: item.productId });
      if (!product) {
        return NextResponse.json(
          { message: "product not found" },
          { status: 404 },
        );
      }

      totalPrice += product.price * item.quantity;
      cartProducts.push({ item, product });
    }

    const order = await db.transaction(async (tx) => {
      const order = await tx.orm.public.Order.create({
        userId: user.id,
        totalPrice,
        fullName,
        phone,
        country,
        city,
        address,
        postalCode,
      });

      for (const { item, product } of cartProducts) {
        await tx.orm.public.OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        });
      }

      for (const item of cartItems) {
        await tx.orm.public.CartItem.where({
          id: item.id,
        }).delete();
      }

      return order;
    });

    return NextResponse.json(
      { message: "Order created successfully", order },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "failed to create order, please try again" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized, Login first" },
        { status: 401 },
      );
    }

    const orders = await db.orm.public.Order.where({ userId: user.id }).all();

    const ordersWithItems = [];

    for (const order of orders) {
      const orderItems = await db.orm.public.OrderItem.where({
        orderId: order.id,
      }).all();

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
