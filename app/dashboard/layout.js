"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import Navbar from "../_components/Navbar";
import Overview from "../_components/Overview";
import Component from "../_components/Chart";
import ExpenseComponent from "../_components/Expense";
import IncomeComponent from "../_components/Income";
import { Router } from "next/router";

function Dashboard({ children }) {
  // const { user } = useUser();
  const router = useRouter();
  // if (!user) {
  //   router.push("/sign-in");
  // }
  const handleAddExpense = () => {
    router.push("/dashboard/add-expense");
  }
  const handleAddIncome = () => {
    router.push("/dashboard/add-income");
  }
  const totalIncome = 5000;
  const totalExpenses = 3000;

  return (
    <div className="w-full min-h-screen text-white">
      <div>
        <Navbar />
      </div>
      <div className="px-16">
        <div className="py-3 border-b-2 border-gray-800 shadow-lg flex justify-between items-center">
          <p className="text-3xl text-white">Overview</p>
          <div className="space-x-4">
            <button onClick={handleAddExpense}>Add Expense</button>
            <button onClick={handleAddIncome}>Add Transaction</button>
          </div>
        </div>
        <div className="mt-8">
          <Overview />
        </div>
        <div className="flex space-x-6 mt-6">
          {/* Left: Expenses Component */}
          <div className="w-1/2">
            <ExpenseComponent />
          </div>

          {/* Right: Income Component */}
          <div className="w-1/2">
            <IncomeComponent />
          </div>
        </div>
        <div className="text-3xl text-white py-3 border-b-2 border-gray-800 shadow-lg mt-8">
          History
        </div>
        <div className="mt-8 h-28">
          <Component income={totalIncome} expenses={totalExpenses} />
        </div>
        <div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Dashboard;
