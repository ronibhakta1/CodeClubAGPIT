"use client";

import React from "react";
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
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "next-themes";

const YEARS = ["SY", "TY", "FY"];
const DEPARTMENTS = ["Computer", "IT", "EXTC", "Mechanical", "Civil"];

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  year?: string;
  department?: string;
  joinedAt?: string;
}

interface ManageUsersProps {
  selectedYear: string | null;
  setSelectedYear: React.Dispatch<React.SetStateAction<string | null>>;
  selectedDepartment: string | null;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ManageUsers({
  selectedYear,
  setSelectedYear,
  selectedDepartment,
  setSelectedDepartment,
}: ManageUsersProps) {
  const [users, setUsers] = React.useState<User[]>([]);
  const { theme } = useTheme();

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [syRes, tyRes, fyRes] = await Promise.all([
          fetch("/club_members_SY.json"),
          fetch("/club_members_TY.json"),
          fetch("/club_members_FY.json"),
        ]);
        let fyData = await fyRes.json();
        let syData = await syRes.json();
        let tyData = await tyRes.json();

        fyData = fyData.map((u: User) => ({ ...u, year: "FY", department: "Computer" }));
        syData = syData.map((u: User) => ({ ...u, year: "SY", department: "Computer" }));
        tyData = tyData.map((u: User) => ({ ...u, year: "TY", department: "Computer" }));

        setUsers([...fyData, ...syData, ...tyData]);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const getRoleStyles = (role: string) => {
    switch (role) {
      case "President": return "bg-red-500/20 text-red-400";
      case "Vice President": return "bg-green-500/20 text-green-400";
      case "Secretary": return "bg-yellow-500/20 text-yellow-400";
      case "Moderator": return "bg-orange-500/20 text-orange-400";
      case "Faculty": return "bg-teal-500/20 text-teal-400";
      case "Member":
      default: return "bg-blue-500/20 text-blue-400";
    }
  };

  const handleChangeRole = (id: string, newRole: string) => {
    const userToUpdate = users.find((u) => u.id === id);
    if (!userToUpdate) return;

    if (newRole === "Member") {
      setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
      return;
    }

    const existing = users.find(
      (u) =>
        u.id !== id &&
        u.year === userToUpdate.year &&
        u.department === userToUpdate.department &&
        u.role === newRole
    );

    if (existing) {
      setUsers(
        users.map((u) => {
          if (u.id === id) return { ...u, role: newRole };
          if (u.id === existing.id) return { ...u, role: userToUpdate.role };
          return u;
        })
      );
    } else {
      setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    }
  };

  const handleRemoveUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleAddRole = (id: string) => {
    alert(`Add role to ${id}`);
  };

  const filteredUsers = users.filter(
    (u) =>
      (!selectedYear || u.year === selectedYear) &&
      (!selectedDepartment || u.department === selectedDepartment)
  );

  return (
    <div className="flex flex-col gap-3 mt-3">
      <Card className="bg-zinc-900 text-zinc-100 border border-zinc-700 shadow-xl rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold tracking-tight text-zinc-100">
            Manage Users
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selectedYear ? (
            <YearSelector users={users} setSelectedYear={setSelectedYear} theme={theme} />
          ) : !selectedDepartment ? (
            <DepartmentSelector
              users={users}
              selectedYear={selectedYear}
              setSelectedDepartment={setSelectedDepartment}
              setSelectedYear={setSelectedYear}
              theme={theme}
            />
          ) : (
            <>
              <div className="flex gap-2 mb-2">
                <Button variant="secondary" onClick={() => setSelectedDepartment(null)}>
                  Back to Departments
                </Button>
                <Button variant="secondary" onClick={() => setSelectedYear(null)}>
                  Back to Years
                </Button>
              </div>
              {filteredUsers.length === 0 ? (
                <p className="text-zinc-400 text-center">
                  No users for {selectedYear} - {selectedDepartment}
                </p>
              ) : (
                <div className="space-y-3">
                  {filteredUsers.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      handleRemoveUser={handleRemoveUser}
                      handleAddRole={handleAddRole}
                      handleChangeRole={handleChangeRole}
                      getRoleStyles={getRoleStyles}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// 🧩 User Card
function UserCard({ user, handleRemoveUser, handleAddRole, handleChangeRole, getRoleStyles }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-xl border border-zinc-700 shadow">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback className="bg-indigo-600 text-white">
            {user.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-base font-medium text-zinc-100">{user.name}</p>
          <p className="text-xs text-zinc-400">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getRoleStyles(user.role)}`}>
          {user.role}
        </span>
        <Select value={user.role} onValueChange={(v) => handleChangeRole(user.id, v)}>
          <SelectTrigger className="w-28 h-8 bg-zinc-800 text-zinc-200 border-zinc-700">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
            {[
              "President", "Vice President", "Secretary",
              "Dsa Lead", "Web Lead", "Android Lead",
              "Member", "Moderator", "Faculty",
            ].map((role) => (
              <SelectItem key={role} value={role}>{role}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          size="icon"
          variant="ghost"
          className="hover:text-blue-400 border border-zinc-700"
          onClick={() => handleAddRole(user.id)}
        >
          <UserPlus className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="hover:text-red-400 border border-zinc-700"
          onClick={() => handleRemoveUser(user.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// 🧩 Year Selector
function YearSelector({ users, setSelectedYear, theme }: any) {
  return (
    <div className="flex gap-6 justify-center">
      {YEARS.map((year) => {
        const count = users.filter((u: User) => u.year === year).length;
        return (
          <Card
            key={year}
            className="p-0 max-w-xs w-full cursor-pointer bg-zinc-800 hover:bg-zinc-700 h-44"
            onClick={() => setSelectedYear(year)}
          >
            <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"} className="p-0 h-full">
              <div className="flex flex-col items-center justify-center h-full">
                <CardTitle className="text-2xl font-bold text-zinc-100 mb-2">{year}</CardTitle>
                <span className="text-zinc-400 text-lg">{count} student{count !== 1 ? "s" : ""}</span>
              </div>
            </MagicCard>
          </Card>
        );
      })}
    </div>
  );
}

// 🧩 Department Selector
function DepartmentSelector({ users, selectedYear, setSelectedDepartment, setSelectedYear, theme }: any) {
  return (
    <div className="flex gap-6 justify-center flex-wrap">
      {DEPARTMENTS.map((dept) => {
        const count = users.filter((u: User) => u.year === selectedYear && u.department === dept).length;
        return (
          <Card
            key={dept}
            className="p-0 max-w-xs w-full cursor-pointer bg-zinc-800 hover:bg-zinc-700 h-40"
            onClick={() => setSelectedDepartment(dept)}
          >
            <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"} className="p-0 h-full">
              <div className="flex flex-col items-center justify-center h-full">
                <CardTitle className="text-xl font-semibold text-zinc-100 mb-2">{dept}</CardTitle>
                <span className="text-zinc-400 text-base">{count} student{count !== 1 ? "s" : ""}</span>
              </div>
            </MagicCard>
          </Card>
        );
      })}
      <Card
        className="p-0 max-w-xs w-full cursor-pointer bg-zinc-800 hover:bg-zinc-700 h-40 mt-2"
        onClick={() => setSelectedYear(null)}
      >
        <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"} className="p-0 h-full">
          <div className="flex flex-col items-center justify-center h-full">
            <CardTitle className="text-xl font-semibold text-zinc-100 mb-2">Back to Year</CardTitle>
          </div>
        </MagicCard>
      </Card>
    </div>
  );
}
