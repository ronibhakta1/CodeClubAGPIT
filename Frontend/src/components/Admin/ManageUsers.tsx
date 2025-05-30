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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  joinedAt?: string;
}

export default function ManageUsers() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch data from JSON files
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [fyResponse, syResponse, tyResponse] = await Promise.all([
          
          fetch("/club_members_TY.json"),
          fetch("/club_members_FY.json"),
          fetch("/club_members_SY.json"),
        ]);

        const fyData: User[] = await fyResponse.json();
        const syData: User[] = await syResponse.json();
        const tyData: User[] = await tyResponse.json();

        // Combine all users
        const allUsers = [...fyData, ...syData, ...tyData];
        setUsers(allUsers);
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
    alert(`Changing role for user with ID: ${id} to ${newRole}`);
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
    // TODO: Call backend API to update role
  };

  // Role color mapping
  const getRoleStyles = (role: string) => {
    switch (role) {
      case "President":
        return "bg-red-500/20 text-red-400";
      case "Vice President":
        return "bg-green-500/20 text-green-400";
      case "Secretary":
        return "bg-yellow-500/20 text-yellow-400";
      case "Member":
        return "bg-blue-500/20 text-blue-400";
      case "Moderator":
        return "bg-orange-500/20 text-orange-400";
      case "Faculty":
        return "bg-teal-500/20 text-teal-400";
      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  return (
    <Card className="bg-zinc-900 text-white border mt-3 border-zinc-700 shadow-lg  rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Manage Users
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-zinc-800 rounded-xl animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-zinc-700" />
                  <div className="space-y-2">
                    <div className="h-5 w-40 bg-zinc-700 rounded-md" />
                    <div className="h-4 w-32 bg-zinc-700 rounded-md" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-6 w-24 bg-zinc-700 rounded-full" />
                  <div className="h-8 w-28 bg-zinc-700 rounded-md" />
                  <div className="h-8 w-8 bg-zinc-700 rounded-md" />
                  <div className="h-8 w-8 bg-zinc-700 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700/50 transition-colors duration-200"
              >
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-indigo-600 text-white">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-medium text-zinc-200">{user.name}</p>
                    <p className="text-xs text-zinc-400">{user.email}</p>
                  </div>
                </div>

                {/* Role & Actions */}
                <div className="flex items-center gap-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${getRoleStyles(user.role)}`}
                  >
                    {user.role}
                  </span>
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
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}