
import ActivityOverview from "./ActivityOverview";
import UserBarChart from "./UserBarCharts";
import RecentlyJoinedUsers from "./RecentlyJoinedUsers";

export default function AdminDashboardStats() {
  return (
    <div className="flex flex-col gap-3 mt-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart Section */}
        <UserBarChart />

        {/* Activity Overview - Same height as bar chart */}
        <ActivityOverview />
      </div>
      <RecentlyJoinedUsers />
    </div>
  );
}
