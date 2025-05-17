import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("auth", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  const response = NextResponse.json({ message: "Logged out successfully" });
  response.headers.set("Set-Cookie", cookie);
  return response;
}
