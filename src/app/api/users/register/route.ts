import { db } from "@/prisma/db";
import { RegisterUserDto } from "@/utils/dtos";
import { setCookie } from "@/utils/generateToken";
import { JWTPayload } from "@/utils/types";
import { registerSchema } from "@/utils/validationSchemas";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;

    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "validation failed", errors: validation.error.issues },
        { status: 400 },
      );
    }
    const { name, email, password } = validation.data;

    const user = await db.orm.public.User.first({ email });
    if (user) {
      return NextResponse.json(
        { message: "this user is already registerd" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.orm.public.User.create({
      name,
      email,
      password: hashedPassword,
    });

    const response = NextResponse.json(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        isAdmin: newUser.isAdmin,
        message: "Registered & Authanticated",
      },
      { status: 201 },
    );

    const jwtPayload: JWTPayload = {
      id: newUser.id,
      name: newUser.name,
      isAdmin: newUser.isAdmin,
    };

    return setCookie(jwtPayload, response);
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
