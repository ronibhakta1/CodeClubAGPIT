"use client";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";

const UserBarChart = () => {
  const [showDegree, setShowDegree] = useState(true);

  const departmentStats = [
    { dept: "CSE", degree: 100, diploma: 70 },
    { dept: "ENTC", degree: 80, diploma: 60 },
    { dept: "MECH", degree: 60, diploma: 40 },
    { dept: "CIVIL", degree: 40, diploma: 30 },
    { dept: "AI", degree: 40, diploma: 30 },
    { dept: "ELC", degree: 40, diploma: 30 },
  ];

  return (
    <Card className="bg-zinc-900 text-white h-[380px] rounded-2xl shadow-md">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-lg font-semibold">Total Users</CardTitle>
        {/* Clean Toggle (no hover, no animations) */}
        <div className="flex items-center gap-2 text-sm">
          <span
            className={`cursor-pointer ${
              showDegree ? "text-zinc-400 font-bold" : "text-zinc-600"
            }`}
            onClick={() => setShowDegree(true)}
          >
            &lt;
          </span>
          <span className="text-zinc-500">/</span>
          <span
            className={`cursor-pointer ${
              !showDegree ? "text-zinc-400 font-bold" : "text-zinc-700"
            }`}
            onClick={() => setShowDegree(false)}
          >
            &gt;
          </span>
        </div>
      </CardHeader>

      <CardContent className="h-[300px] px-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={departmentStats} barCategoryGap={20}>
            <XAxis
              dataKey="dept"
              stroke="#a1a1aa"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: 12 }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: "#4f46e5",
                fontSize: "0.875rem",
              }}
              labelStyle={{ color: "#e4e4e7" }}
            />
            <Bar
              dataKey={showDegree ? "degree" : "diploma"}
              fill={showDegree ? "#4f46e5" : "#22d3ee"}
              radius={[8, 8, 0, 0]}
              barSize={50} // Wider bars
            >
              <LabelList
                dataKey={showDegree ? "degree" : "diploma"}
                position="top"
                style={{ fill: "#fff", fontSize: 14, fontWeight: 500 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default UserBarChart;
