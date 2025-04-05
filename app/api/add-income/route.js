// app/api/add-income/route.js
import db from "@/app/db/dbConfig";
import { incomes } from "@/app/db/schema";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { user_id } = getAuth(request); // Get the authenticated user's ID

    if (!user_id) {
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

    await db.insert(incomes).values({
      name,
      amount,
      category,
      createdAt,
      user_id,
    });

    return NextResponse.json({ success: true, message: "Income added!" });
  } catch (error) {
    console.error("Error adding income:", error);
    return NextResponse.json(
      { error: "Failed to add income." },
      { status: 500 }
    );
  }
}
