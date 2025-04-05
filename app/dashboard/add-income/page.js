"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AddIncome() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(null); // State to store selected date
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure all fields are filled
    if (!name || !amount || !category || !date) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch("/api/add-income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          amount,
          category,
          createdAt: date.toISOString().split("T")[0], // Send the date as a string (YYYY-MM-DD)
        }),
      });

      if (response.ok) {
        alert("Income added successfully!");
        // Optionally, reset the form after successful submission
        router.push("/dashboard"); // Redirect to dashboard
        setName("");
        setAmount("");
        setCategory("");
        setDate(null); // Reset the date picker
      } else {
        alert("Failed to add income.");
      }
    } catch (error) {
      console.error("Error adding income:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="z-50 w-full h-screen fixed top-0 left-0 bg-gray-900 bg-opacity-90 flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Income</CardTitle>
          <CardDescription>Enter details for your income.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of the income"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  placeholder="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category" className="mb-1">
                  Category
                </Label>
                <Select
                  id="category"
                  value={category}
                  onValueChange={(value) => setCategory(value)} // Update the category state correctly
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Salary">Salary</SelectItem>
                    <SelectItem value="Bonus">Bonus</SelectItem>
                    <SelectItem value="Investment">Investment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Date Picker Component */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"primary"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal border border-zinc-400",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <CardFooter className="flex justify-between mt-6">
              <Button type="button" variant="destructive" onClick={() => router.push("/dashboard")}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
