import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const departmentStats = [
  { dept: "CSE", degree: 100, diploma: 70 },
  { dept: "ENTC", degree: 80, diploma: 60 },
  { dept: "MECH", degree: 60, diploma: 40 },
  { dept: "CIVIL", degree: 40, diploma: 30 },
  { dept: "AI", degree: 40, diploma: 30 },
  { dept: "ELC", degree: 40, diploma: 30 },
];

// Skeleton loader
const SkeletonLoader = () => (
  <div className="h-[300px] bg-zinc-800 animate-pulse rounded-md">
    <div className="flex justify-between items-center p-4">
      <div className="h-6 bg-zinc-700 w-1/4 mb-2"></div>
    </div>
    <div className="h-[200px] bg-zinc-700 rounded-md"></div>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md bg-zinc-800 border border-indigo-600 px-3 py-2 text-sm text-white shadow-md">
        <p className="font-medium text-indigo-400">{label}</p>
        <p>
          {payload[0].name}:{" "}
          <span className="font-semibold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const UserBarChart = () => {
  const [showDegree, setShowDegree] = useState(true);
  const [animateDir, setAnimateDir] = useState<"left" | "right">("right");
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [departmentData] = useState(departmentStats);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleToggle = () => {
    setAnimateDir(showDegree ? "left" : "right");
    setShowDegree((prev) => !prev);
  };

  // Simulate data fetch and loading
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate an API call with a delay
      setTimeout(() => {
        setIsLoading(false); // Set loading to false after data is fetched
        // In real scenario, replace the above line with API call and set the data
      }, 5000); // Simulated loading time
    };

    fetchData();
  }, []);

  // Auto-toggle every 6 seconds
  useEffect(() => {
    if (!isHovered && !isLoading) {
      intervalRef.current = setInterval(() => {
        setAnimateDir(showDegree ? "left" : "right");
        setShowDegree((prev) => !prev);
      }, 6000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, isLoading, showDegree]);

  const dataKey = showDegree ? "degree" : "diploma";

  // Calculate total count based on the degree or diploma
  const totalCount = departmentData.reduce((total, dept) => {
    return total + dept[dataKey]; // Add degree or diploma count
  }, 0);

  // Gradient for degree and diploma with slight differences
  const degreeBarColor = "url(#degreeGradient)";
  const diplomaBarColor = "url(#diplomaGradient)";

  return (
    <Card className="bg-zinc-900 text-white rounded-2xl shadow-xl overflow-hidden">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          {showDegree ? "Degree" : "Diploma"} -{" "}
          {isLoading ? (
            <span className="w-6 h-5 bg-zinc-700 rounded-md animate-pulse inline-block" />
          ) : (
            totalCount
          )}
        </CardTitle>

        {/* Flip toggle button */}
        <div
          onClick={handleToggle}
          className={cn(
            "cursor-pointer text-xl transition-transform duration-300"
          )}
        >
          <Button
            className=" text-white text-2xl py-1 px-3 cursor-pointer "
          >
            {showDegree ? "<>" : "<>"}
          </Button>
        </div>
      </CardHeader>

      <CardContent
        className="h-[300px] px-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Show skeleton loader if data is still loading */}
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div
            key={dataKey}
            className={cn(
              "h-full transition-all duration-500 ease-in-out",
              animateDir === "left"
                ? "animate-slide-left"
                : "animate-slide-right"
            )}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentData}
                barCategoryGap={20}
                margin={{ top: 20, right: 20, left: 10, bottom: 0 }}
              >
                {/* Defining Gradients */}
                <defs>
                  <linearGradient
                    id="degreeGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#f3f4f6" />
                    <stop offset="100%" stopColor="#111827" />
                  </linearGradient>
                  <linearGradient
                    id="diplomaGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#e5e7eb" />
                    <stop offset="100%" stopColor="#1f2937" />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="dept"
                  stroke="#a1a1aa"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey={dataKey}
                  fill={showDegree ? degreeBarColor : diplomaBarColor}
                  radius={[10, 10, 0, 0]}
                  barSize={60}
                  animationDuration={600}
                  // Disable hover effects (no activeDot or hover property)
                >
                  <LabelList
                    dataKey={dataKey}
                    position="top"
                    style={{ fill: "#fff", fontSize: 14, fontWeight: 500 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserBarChart;