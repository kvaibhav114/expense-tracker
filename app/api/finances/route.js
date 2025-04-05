// app/api/finances/route.js
import db from "@/app/db/dbConfig";
import { expenses, incomes } from "@/app/db/schema";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Fetch expenses and incomes from the database
    const fetchedExpenses = await db.select().from(expenses);
    const fetchedIncomes = await db.select().from(incomes);

    // Respond with both datasets
    return NextResponse.json({
      success: true,
      data: {
        expenses: fetchedExpenses,
        incomes: fetchedIncomes,
      },
    });
  } catch (error) {
    console.error("Error fetching finances:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch finances" },
      { status: 500 }
    );
  }
};
