
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityOverview from "./ActivityOverview";
import UserBarChart from "./UserBarCharts";


export default function AdminDashboardStats() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bar Chart Section */}
      <UserBarChart/>

      {/* Activity Overview - Same height as bar chart */}
      <ActivityOverview/>

      {/* Recently Joined Users - full width below */}
      <div className="md:col-span-2">
        <Card className="bg-zinc-900 text-white">
          <CardHeader>
            <CardTitle>Recently Joined Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-zinc-700 pb-2">
                <span>Nasir Nadaf</span>
                <span className="text-sm text-zinc-400">3 mins ago</span>
              </li>
              <li className="flex justify-between border-b border-zinc-700 pb-2">
                <span>Vikas Budhyal</span>
                <span className="text-sm text-zinc-400">10 mins ago</span>
              </li>
              <li className="flex justify-between">
                <span>Suhas Alagi</span>
                <span className="text-sm text-zinc-400">20 mins ago</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
