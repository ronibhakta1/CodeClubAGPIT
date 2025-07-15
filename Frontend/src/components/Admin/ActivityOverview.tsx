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

// Chart data
const chartData = [
  { category: "activeUsers", value: 500, fill: "#4CAF50" }, // Green
  { category: "clubMembers", value: 280, fill: "#FF9800" }, // Orange
  { category: "pageVisits", value: 100, fill: "#2196F3" }, // Blue
];

// Chart config
const chartConfig = {
  value: {
    label: "Users",
  },
  activeUsers: {
    label: "Active Users",
    color: "#4CAF50",
  },
  clubMembers: {
    label: "Club Members",
    color: "#FF9800",
  },
  pageVisits: {
    label: "Page Visits",
    color: "#2196F3",
  },
} satisfies ChartConfig;

export default function ActivityOverview() {
  const totalValue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="flex flex-col bg-zinc-900 text-white border-zinc-100 shadow-lg">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Active Users / Page Visit Count -
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
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
      </CardContent>
      <CardFooter className="flex-col gap-3 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-zinc-200">
          Active users up by 5% this week{" "}
          <TrendingUp className="h-4 w-4 text-green-400" />
        </div>
      </CardFooter>
    </Card>
  );
}
