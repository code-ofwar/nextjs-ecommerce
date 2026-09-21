import { db } from "@/prisma/db";
import { AddCarttDto, DeleteCartDto, UpdateCartDto } from "@/utils/dtos";
import {
  addCartSchema,
  deleteCartSchema,
  updateCartSchema,
} from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized, Login first" },
        { status: 401 },
      );
    }

    const cart = await db.orm.public.Cart.first({ userId: user.id });
    if (!cart) {
      return NextResponse.json({ message: "cart not found" }, { status: 404 });
    }

    const cartItems = await db.orm.public.CartItem.where({
      cartId: cart.id,
    }).all();

    const items = await Promise.all(
      cartItems.map(async (item) => {
        const product = await db.orm.public.Product.first({
          id: item.productId,
        });

        return {
          quantity: item.quantity,
          product,
        };
      }),
    );

    return NextResponse.json(
      {
        cart: {
          id: cart.id,
          items,
        },
      },
      { status: 200 },
    );
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
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized, Login first" },
        { status: 401 },
      );
    }

    const body = (await request.json()) as AddCarttDto;

    const validation = addCartSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "validation failed" },
        { status: 400 },
      );
    }

    const { productId, quantity } = validation.data;

    const product = await db.orm.public.Product.first({ id: productId });
    if (!product) {
      return NextResponse.json(
        { message: "product not found in cart" },
        { status: 404 },
      );
    }

    let cart = await db.orm.public.Cart.first({ userId: user.id });
    if (!cart) {
      cart = await db.orm.public.Cart.create({
        userId: user.id,
      });
    }

    let cartItem = await db.orm.public.CartItem.first({
      cartId: cart.id,
      productId: product.id,
    });

    if (cartItem) {
      if (cartItem.quantity + quantity > product.stock) {
        return NextResponse.json(
          { message: "Not enough stock" },
          { status: 400 },
        );
      }

      cartItem = await db.orm.public.CartItem.where({ id: cartItem.id }).update(
        {
          quantity: cartItem.quantity + quantity,
        },
      );
    } else {
      if (quantity > product.stock) {
        return NextResponse.json(
          { message: "Not enough stock" },
          { status: 400 },
        );
      }

      cartItem = await db.orm.public.CartItem.create({
        cartId: cart.id,
        productId: product.id,
        quantity,
      });
    }
    return NextResponse.json(
      {
        message: "Product added to cart successfully",
        cartItem,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized, Login first" },
        { status: 401 },
      );
    }

    const body = (await request.json()) as UpdateCartDto;

    const validation = updateCartSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "validation failed" },
        { status: 400 },
      );
    }

    const { productId, quantity } = validation.data;

    const cart = await db.orm.public.Cart.first({ userId: user.id });
    if (!cart) {
      return NextResponse.json({ message: "cart not found" }, { status: 404 });
    }

    const cartItem = await db.orm.public.CartItem.first({
      cartId: cart.id,
      productId,
    });
    if (!cartItem) {
      return NextResponse.json(
        { message: "product not found in cart" },
        { status: 404 },
      );
    }

    const product = await db.orm.public.Product.first({ id: productId });
    if (!product) {
      return NextResponse.json(
        { message: "product not found" },
        { status: 404 },
      );
    }

    if (quantity > product.stock) {
      return NextResponse.json(
        { message: "Not enough stock" },
        { status: 400 },
      );
    }

    const updateQuantity = await db.orm.public.CartItem.where({
      id: cartItem.id,
    }).update({ quantity });

    return NextResponse.json({ updateQuantity }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized, Login first" },
        { status: 401 },
      );
    }

    const body = (await request.json()) as DeleteCartDto;

    const validation = deleteCartSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "validation failed" },
        { status: 400 },
      );
    }
    const { productId } = validation.data;

    const cart = await db.orm.public.Cart.first({ userId: user.id });
    if (!cart) {
      return NextResponse.json({ message: "cart not found" }, { status: 404 });
    }

    const cartItem = await db.orm.public.CartItem.first({
      cartId: cart.id,
      productId,
    });
    if (!cartItem) {
      return NextResponse.json(
        { message: "product not found in cart" },
        { status: 404 },
      );
    }

    await db.orm.public.CartItem.where({
      id: cartItem.id,
    }).delete();

    return NextResponse.json(
      { message: "product removed from cart" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
