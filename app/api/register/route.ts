import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { User } from "@/types/users";

const usersFilePath = path.resolve("registered-users.json");

export async function POST(req: Request) {
  try {
    const { fullName, email, password, confirmPassword } = await req.json();

    if (!fullName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match", success: false },
        { status: 400 }
      );
    }

    let users: User[] = [];
    try {
      const usersData = await fs.readFile(usersFilePath, "utf8");
      users = JSON.parse(usersData);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    }

    // Check for duplicate email
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: "Account with this email already exists", success: false },
        { status: 400 }
      );
    }

    // Add new user
    const newUser: User = { id: Date.now().toString(), fullName, email, password };
    users.push(newUser);

    // Write back to file
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf8");

    return NextResponse.json({ message: "Registration successful",success: true,data:newUser }, { status: 200 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
