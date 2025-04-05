import { UserButton } from "@clerk/nextjs";
import React from "react";

function Navbar() {
  return (
    <div className="w-full flex justify-between items-center text-amber-500 p-6">
      <a href="/dashboard" className="text-2xl font-bold">
        Expense Tracker
      </a>
      <div className="flex items-center space-x-6">
          <a href="/dashboard">Dashboard</a>
          <a href="/manage">Manage Expenses</a>
          <UserButton/>
      </div>
    </div>
  );
}

export default Navbar;
