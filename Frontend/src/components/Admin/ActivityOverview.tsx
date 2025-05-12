
// components/Admin/ActivityOverview.tsx
"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define chart data with explicit colors
const chartData = [
  { category: "activeUsers", value: 500, fill: "#4CAF50" }, // Green
  { category: "clubMembers", value: 280, fill: "#FF9800" }, // Orange
  { category: "pageVisits", value: 100, fill: "#2196F3" }, // Blue
];

// Chart configuration with matching colors
const chartConfig = {
  value: {
    label: "Users",
  },
  activeUsers: {
    label: "Active Users",
    color: "#4CAF50", // Green
  },
  clubMembers: {
    label: "Club Members",
    color: "#FF9800", // Orange
  },
  pageVisits: {
    label: "Page Visits",
    color: "#2196F3", // Blue
  },
} satisfies ChartConfig;

export default function ActivityOverview() {
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate backend data fetch
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Mock data loaded after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  // Calculate total value for the center label
  const totalValue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="flex flex-col bg-zinc-900  text-white border-zinc-100 shadow-lg">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Active Users / Page Visit Count -
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <div className="flex justify-center items-center h-[250px]">
            <div className="w-[200px] h-[200px] rounded-full bg-zinc-800 animate-pulse" />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="bg-zinc-800 text-white border-zinc-700"
                    hideLabel
                  />
                }
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="category"
                innerRadius={70}
                outerRadius={100}
                strokeWidth={3}
                className="drop-shadow-md"
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-white text-4xl font-bold"
                          >
                            {totalValue.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 28}
                            className="fill-zinc-400 text-sm"
                          >
                            Total
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-3 text-sm">
        {isLoading ? (
          <div className="flex flex-col gap-2">
            <div className="h-4 w-48 bg-zinc-800 animate-pulse rounded-md" />
            <div className="h-4 w-36 bg-zinc-800 animate-pulse rounded-md" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 font-medium leading-none text-zinc-200">
              Active users up by 5% this week{" "}
              <TrendingUp className="h-4 w-4 text-green-400" />
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}