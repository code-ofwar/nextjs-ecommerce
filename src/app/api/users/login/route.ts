import { db } from "@/prisma/db";
import { LoginUserDto } from "@/utils/dtos";
import { setCookie } from "@/utils/generateToken";
import { JWTPayload } from "@/utils/types";
import { loginSchema } from "@/utils/validationSchemas";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(requset: NextRequest) {
  try {
    const body = (await requset.json()) as LoginUserDto;

    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues },
        { status: 400 },
      );
    }
    const { email, password } = validation.data;

    const user = await db.orm.public.User.first({ email });
    if (!user) {
      return NextResponse.json(
        { message: "please make an account" },
        { status: 400 },
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 },
      );
    }

    const jwtPayload: JWTPayload = {
      id: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
    };

    const response = NextResponse.json(
      { message: "Authanticated" },
      { status: 200 },
    );

    return setCookie(jwtPayload, response);
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
