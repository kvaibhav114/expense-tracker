import db from "@/app/db/dbConfig";
import { expenses } from "@/app/db/schema";
import { NextResponse } from "next/server";
import { useUser } from "@clerk/nextjs";

export async function POST(request) {
  try {
    const { email } = useUser(request); // Get the authenticated user's ID

    if (!email) {
      return NextResponse.json(
        { error: "Unauthorized: No user ID found." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, amount, category, createdAt } = body;

    if (!name || !amount || !category || !createdAt) {
      return NextResponse.json(
        { error: "All fields (name, amount, category) are required." },
        { status: 400 }
      );
    }

    await db.insert(expenses).values({
      name,
      amount,
      category,
      createdAt,
      email,
    });

    return NextResponse.json({ success: true, message: "Expense added!" });
  } catch (error) {
    console.error("Error adding expense:", error);
    return NextResponse.json(
      { error: "Failed to add expense." },
      { status: 500 }
    );
  }
}
