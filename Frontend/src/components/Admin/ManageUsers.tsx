"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreVertical } from "lucide-react";

const users = [
  {
    id: 1,
    name: "Nasir Nadaf",
    email: "nasir@gmail.com",
    role: "Member",
  },
  {
    id: 2,
    name: "Prachi Nadgir",
    email: "prachi@gmail.com",
    role: "Vice President",
  },
  {
    id: 3,
    name: "Vikas Budhyal",
    email: "VikasBudhyal@gmail.com",
    role: "Secretory",
  },
];

export default function ManageUsers() {
  return (
    <Card className="bg-zinc-900 text-white shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-white text-lg">Manage Users</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition"
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
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-zinc-400">{user.email}</p>
              </div>
            </div>

            {/* Role & Actions */}
            <div className="flex items-center gap-4">
              <span
                className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  user.role === "Admin"
                    ? "bg-green-500/20 text-green-400"
                    : user.role === "Staff"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {user.role}
              </span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-zinc-800 border-zinc-700 text-white">
                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                  <DropdownMenuItem>Change Role</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
