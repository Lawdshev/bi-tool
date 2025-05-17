import { NextResponse } from "next/server";
import { serialize } from "cookie";
import fs from "fs/promises";
import path from "path";
import { User } from "@/types/users";

const usersFilePath = path.resolve("registered-users.json");

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const usersData = await fs.readFile(usersFilePath, "utf8");
    const registeredUsers:User[] =
      JSON.parse(usersData);

    const user = registeredUsers.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (!user) {
      NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
      return NextResponse.json(
        { message: "Invalid credentials",success: false,data:null },
        { status: 400 }
      );
    } else {
      const cookie = serialize("auth", "true", {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60,
      });
      const response = NextResponse.json(
        { message: "Login successful",success: true,data:user },{ status: 200 }
      );
      response.headers.set("Set-Cookie", cookie);
      return response;    
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false, data: null },
      { status: 500 }
    );
  }
}
