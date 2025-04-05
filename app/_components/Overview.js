"use client";
import React, { useEffect, useState } from "react";

const Overview = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [balance, setBalance] = useState(0);

  // Fetch total income and expense data from the combined API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/total-finances");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setTotalIncome(data.totalIncome);
        setTotalExpense(data.totalExpense);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate balance
  useEffect(() => {
    setBalance(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  return (
    <div className="flex space-x-6">
      {/* Total Expense Box */}
      <div className="w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-300">Total Expense</h3>
        <p className="text-2xl font-bold mt-2">${totalExpense}</p>
      </div>

      {/* Total Income Box */}
      <div className="w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-300">Total Income</h3>
        <p className="text-2xl font-bold mt-2">${totalIncome}</p>
      </div>

      {/* Balance Box */}
      <div className="w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-300">Balance</h3>
        <p
          className={`text-2xl font-bold mt-2 ${
            balance < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          ${balance}
        </p>
      </div>
    </div>
  );
};

export default Overview;
