import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

const IncomeComponent = () => {
  const [incomeByCategory, setIncomeByCategory] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  // Fetch incomes and expenses from the API
  const fetchFinances = async () => {
    try {
      const response = await fetch("/api/finances");
      const result = await response.json();

      if (result.success) {
        const fetchedIncomes = result.data.incomes;

        // Group incomes by category and calculate totals
        const groupedIncomes = fetchedIncomes.reduce((acc, income) => {
          const { category, amount } = income;
          if (!acc[category]) {
            acc[category] = { category, amount: 0 };
          }
          acc[category].amount += amount;
          return acc;
        }, {});

        // Convert grouped object into an array and sort by amount
        const groupedArray = Object.values(groupedIncomes).sort((a, b) => b.amount - a.amount);

        setIncomeByCategory(groupedArray);

        // Calculate total incomes
        const total = groupedArray.reduce((acc, income) => acc + income.amount, 0);
        setTotalIncome(total);
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
      <h3 className="text-xl font-semibold text-gray-300 mb-4">Incomes by Category</h3>
      {incomeByCategory.length > 0 ? (
        incomeByCategory.map((income) => {
          const percentage = totalIncome > 0 ? Math.round((income.amount / totalIncome) * 100) : 0;

          return (
            <div key={income.category} className="mb-4">
              {/* Category Name and Percentage */}
              <div className="flex justify-between">
                <span className="text-gray-400">{income.category}</span>
                <span className="text-white">
                  ${income.amount} ({percentage}%)
                </span>
              </div>
              {/* Progress Bar */}
              <Progress value={percentage} className="mt-2" />
            </div>
          );
        })
      ) : (
        <p className="text-gray-400">No incomes added yet.</p>
      )}
    </div>
  );
};

export default IncomeComponent;
