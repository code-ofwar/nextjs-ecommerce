import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";
import { NextResponse } from "next/server";

export function generateJWT(jwtPayload: JWTPayload) {
  const privateKey = process.env.JWT_SECRET as string;

  const token = jwt.sign(jwtPayload, privateKey, { expiresIn: "30d" });

  return token;
}

export function setCookie(jwtPayload: JWTPayload, response: NextResponse) {
  const token = generateJWT(jwtPayload);

  response.cookies.set("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
