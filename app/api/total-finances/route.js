// app/api/total-finances/route.js
import { sum } from "drizzle-orm";
import { expenses, incomes } from "@/app/db/schema";
import db from "@/app/db/dbConfig";

export async function GET(req) {
  try {
    // Fetch total income and total expense using Drizzle ORM's sum function
    const incomeResult = await db.select({ totalIncome: sum(incomes.amount) }).from(incomes);
    const expenseResult = await db.select({ totalExpense: sum(expenses.amount) }).from(expenses);

    // Extract the totals from the results
    const totalIncome = incomeResult[0]?.totalIncome || 0;
    const totalExpense = expenseResult[0]?.totalExpense || 0;

    // Return both totals in the response
    return new Response(
      JSON.stringify({
        totalIncome,
        totalExpense,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching total finances:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching total finances" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
