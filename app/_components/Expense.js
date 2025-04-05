import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

const ExpenseComponent = () => {
  const [expensesByCategory, setExpensesByCategory] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  // Fetch expenses and incomes from the API
  const fetchFinances = async () => {
    try {
      const response = await fetch("/api/finances");
      const result = await response.json();

      if (result.success) {
        const fetchedExpenses = result.data.expenses;

        // Group expenses by category and calculate totals
        const groupedExpenses = fetchedExpenses.reduce((acc, expense) => {
          const { category, amount } = expense;
          if (!acc[category]) {
            acc[category] = { category, amount: 0 };
          }
          acc[category].amount += amount;
          return acc;
        }, {});

        // Convert grouped object into an array and sort by amount
        const groupedArray = Object.values(groupedExpenses).sort((a, b) => b.amount - a.amount);

        setExpensesByCategory(groupedArray);

        // Calculate total expenses
        const total = groupedArray.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalExpense(total);
      } else {
        console.error("Failed to fetch finances:", result.message);
      }
    } catch (error) {
      console.error("Error fetching finances:", error);
    }
  };

  // Call the API on component mount
  useEffect(() => {
    fetchFinances();
  }, []);

  return (
    <div className="w-full bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-300 mb-4">Expenses by Category</h3>
      {expensesByCategory.length > 0 ? (
        expensesByCategory.map((expense) => {
          const percentage = totalExpense > 0 ? Math.round((expense.amount / totalExpense) * 100) : 0;

          return (
            <div key={expense.category} className="mb-4">
              {/* Category Name and Percentage */}
              <div className="flex justify-between">
                <span className="text-gray-400">{expense.category}</span>
                <span className="text-white">
                  ${expense.amount} ({percentage}%)
                </span>
              </div>
              {/* Progress Bar */}
              <Progress value={percentage} className="mt-2" />
            </div>
          );
        })
      ) : (
        <p className="text-gray-400">No expenses added yet.</p>
      )}
    </div>
  );
};

export default ExpenseComponent;
