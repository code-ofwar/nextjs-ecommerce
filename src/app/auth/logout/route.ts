import { NextRequest, NextResponse } from "next/server";

export async function DELETE() {
  try {
    const response = NextResponse.json({ message: "logout" }, { status: 200 });
    response.cookies.delete("jwtToken");
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
