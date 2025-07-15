
import * as React from "react";
import { Trash2, UserPlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  joinedAt?: string;
  department: string;
  year: string;
}

export default function RecentlyJoinedUsers() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch data from JSON files and sort by joinedAt
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [fyResponse, syResponse, tyResponse] = await Promise.all([
          fetch("/club_members_FY.json"),
          fetch("/club_members_SY.json"),
          fetch("/club_members_TY.json"),
        ]);

        const fyData: User[] = await fyResponse.json();
        const syData: User[] = await syResponse.json();
        const tyData: User[] = await tyResponse.json();

        // Combine and sort users by joinedAt (descending)
        const allUsers = [...fyData, ...syData, ...tyData].sort((a, b) => {
          if (!a.joinedAt || !b.joinedAt) return 0;
          return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
        });

        // Show only the top 3 recently joined users
        setUsers(allUsers.slice(0, 3));
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Mock functions for user actions (replace with backend calls)
  const handleRemoveUser = (id: string) => {
    alert(`Removing user with ID: ${id}`);
    setUsers(users.filter((user) => user.id !== id));
    // TODO: Call backend API to remove user
  };

  const handleAddRole = (id: string) => {
    alert(`Adding role for user with ID: ${id}`);
    // TODO: Call backend API to add role
  };

  const handleChangeRole = (id: string, newRole: string) => {
    // Find the user being updated
    const userToUpdate = users.find((user) => user.id === id);
    if (!userToUpdate) return;

    // Only allow multiple 'Member' roles
    if (newRole === "Member") {
      alert(`Changing role for user with ID: ${id} to ${newRole}`);
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, role: newRole } : user
        )
      );
      // TODO: Call backend API to update role
      return;
    }

    // For all other roles, ensure only one per department and year
    const existingUser = users.find(
      (user) =>
        user.id !== id &&
        user.department === userToUpdate.department &&
        user.year === userToUpdate.year &&
        user.role === newRole
    );
    if (existingUser) {
      // Swap roles: the new user gets the role, the previous holder gets the new user's previous role
      alert(`${userToUpdate.name} is now ${newRole}, and ${existingUser.name} is now ${userToUpdate.role}.`);
      setUsers(
        users.map((user) => {
          if (user.id === id) {
            return { ...user, role: newRole };
          } else if (user.id === existingUser.id) {
            return { ...user, role: userToUpdate.role };
          } else {
            return user;
          }
        })
      );
      // TODO: Call backend API to update roles
      return;
    }

    alert(`Changing role for user with ID: ${id} to ${newRole}`);
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
    // TODO: Call backend API to update role
  };

  // Format joinedAt to relative time (e.g., "3 mins ago")
  const formatJoinedAt = (joinedAt?: string) => {
    if (!joinedAt) return "Unknown time";
    const now = new Date();
    const joined = new Date(joinedAt);
    const diffMs = now.getTime() - joined.getTime();
    const diffMins = Math.floor(diffMs / 1000 / 60);

    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  return (
    <Card className="bg-zinc-900 text-white border border-zinc-700 shadow-lg ">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Recently Joined Users
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ul className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-zinc-800" />
                  <div className="h-5 w-40 bg-zinc-800 rounded-md" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-5 w-20 bg-zinc-800 rounded-md" />
                  <div className="h-8 w-24 bg-zinc-800 rounded-md" />
                  <div className="h-8 w-8 bg-zinc-800 rounded-md" />
                  <div className="h-8 w-8 bg-zinc-800 rounded-md" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center py-2 border-b border-zinc-800 last:border-b-0 hover:bg-zinc-800/50 transition-colors duration-200 rounded-md px-2"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-300 font-medium">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-base font-medium text-zinc-200">
                    {user.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-zinc-400">{formatJoinedAt(user.joinedAt)}</span>
                  <Select
                    value={user.role}
                    onValueChange={(value) => handleChangeRole(user.id, value)}
                  >
                    <SelectTrigger className="w-28 bg-zinc-800 border-zinc-700 text-zinc-200 h-8">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                      <SelectItem value="President">President</SelectItem>
                      <SelectItem value="Vice President">Vice President</SelectItem>
                      <SelectItem value="Secretary">Secretary</SelectItem>
                      <SelectItem value="Dsa Lead">Dsa Lead</SelectItem>
                      <SelectItem value="Web Lead">Web Lead</SelectItem>
                      <SelectItem value="Android Lead">Android Lead</SelectItem>
                      <SelectItem value="Member">Member</SelectItem>
                      <SelectItem value="Moderator">Moderator</SelectItem>
                      <SelectItem value="Faculty">Faculty</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 hover:text-blue-400 hover:bg-zinc-700 h-8 w-8"
                    onClick={() => handleAddRole(user.id)}
                    title="Add Role"
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 hover:text-red-400 hover:bg-zinc-700 h-8 w-8"
                    onClick={() => handleRemoveUser(user.id)}
                    title="Remove User"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}