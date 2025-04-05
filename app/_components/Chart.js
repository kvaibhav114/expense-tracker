"use client";

import { Bar, BarChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
};

export default function Component() {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[100px] max-h-[200px] w-full bg-gray-900 shadow-lg p-4"
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        className="bg-gray-800 rounded-lg"
      >
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4  } />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
