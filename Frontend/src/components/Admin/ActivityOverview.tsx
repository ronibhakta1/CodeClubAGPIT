// components/Admin/ActivityOverview.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, ShieldCheck } from "lucide-react"; // Lucide icons

const ActivityOverview = () => {
  return (
    <Card className="bg-zinc-900 text-white">
      <CardHeader>
        <CardTitle>Club Stats Overview</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-9">
        {/* Total Users */}
        <div className="flex flex-col items-start gap-2 p-4 bg-zinc-800 rounded-xl shadow-md">
          <div className="flex items-center gap-2 text-secondary">
            <Users className="w-6 h-6" />
            <span className="text-sm">Total Users</span>
          </div>
          <div className="text-2xl font-bold">5,000</div>
          <div className="text-sm text-gray-400">Overall registered users</div>
        </div>

        {/* Active Users */}
        <div className="flex flex-col items-start gap-2 p-4 bg-zinc-800 rounded-xl shadow-md">
          <div className="flex items-center gap-2 text-secondary">
            <UserCheck className="w-6 h-6" />
            <span className="text-sm">Active Users</span>
          </div>
          <div className="text-2xl font-bold">3,200</div>
          <div className="text-sm text-green-400">↗︎ 5% from last week</div>
        </div>

        {/* Club Members */}
        <div className="flex flex-col items-start gap-2 p-4 bg-zinc-800 rounded-xl shadow-md">
          <div className="flex items-center gap-2 text-secondary">
            <ShieldCheck className="w-6 h-6" />
            <span className="text-sm">Club Members</span>
          </div>
          <div className="text-2xl font-bold">280</div>
          <div className="text-sm text-blue-400">Moderators & Participants</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityOverview;
