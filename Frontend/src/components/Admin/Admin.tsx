import { AppSidebar } from "@/components/Admin/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  SquareTerminal,
  Users,
  CalendarDays,
  UserPlus,
} from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminDashboardStats from "./AdminDashStats";
import ManageUsers from "./ManageUsers";
import ManageEvents from "./ManageEvents";
import AdminStaffSignup from "./AdminStaffSignup";

export default function Admin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = React.useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = React.useState<string | null>(null);

  // Determine active section from current path
  const getActiveSection = () => {
    const path = location.pathname;
    if (path.includes("/admin/users")) return "users";
    if (path.includes("/admin/events")) return "events";
    if (path.includes("/admin/create-staff")) return "create-staff";
    return "dashboard";
  };

  const activeSection = getActiveSection();

  const user = {
    id: 1,
    name: "Roni Bhakta",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQEvEHK2KOMLwQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1705087348506?e=1758153600&v=beta&t=LeSe13JD8yBC4x40Y0gdrSZjOWaDvgIcHjNwDFjxyA4",
    role: "Full Stack Developer",
    codeClubRole: "president",
    skills: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    bio: "Experienced full-stack developer passionate about building scalable web applications.",
    social: {
      github: "https://github.com/ronibhakta1",
      linkedin: "https://linkedin.com/in/ronibhakta1",
      portfolio: "https://ronibhakta1.dev",
    },
    pastEvents: [
      "Hackathon 2024 - Coordinator",
      "React Conference - Speaker",
      "CodeFest 2023 - Judge",
    ],
    yearOfPursuing: "3rd",
    yearOfPassing: "2026",
    email: "roni123@gmail.com",
  };

  const navItems = [
    { title: "Dashboard", icon: SquareTerminal, sectionKey: "dashboard", path: "/admin/dashboard" },
    { title: "Manage Users", icon: Users, sectionKey: "users", path: "/admin/users" },
    { title: "Manage Events", icon: CalendarDays, sectionKey: "events", path: "/admin/events" },
    { title: "Create & Manage Staff", icon: UserPlus, sectionKey: "create-staff", path: "/admin/create-staff" },
  ];

  const setActiveSection = (section: string) => {
    const navItem = navItems.find(item => item.sectionKey === section);
    if (navItem) {
      navigate(navItem.path);
    }
  };

  const renderBreadcrumb = () => {
    const base = (
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
    );
    const separator = <BreadcrumbSeparator />;

    const sectionMap: Record<string, string> = {
      dashboard: "Dashboard",
      users: "Manage Users",
      events: "Manage Events",
      "create-staff": "Create & Manage Staff",
    };

    const isUsers = activeSection === "users";

    return (
      <Breadcrumb>
        <BreadcrumbList>
          {base}
          {separator}
          <BreadcrumbItem>
            {isUsers ? (
              <BreadcrumbLink
                asChild
                onClick={() => {
                  navigate("/admin/users");
                  setSelectedYear(null);
                  setSelectedDepartment(null);
                }}
              >
                <span
                  className={
                    !selectedYear && !selectedDepartment
                      ? "text-zinc-100 font-semibold"
                      : ""
                  }
                  style={{ cursor: "pointer" }}
                >
                  {sectionMap["users"]}
                </span>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="text-zinc-100 font-semibold">
                {sectionMap[activeSection]}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>

          {isUsers && selectedYear && (
            <>
              {separator}
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  onClick={() => setSelectedDepartment(null)}
                >
                  <span
                    className={
                      selectedYear && !selectedDepartment
                        ? "text-zinc-100 font-semibold"
                        : ""
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {selectedYear}
                  </span>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}

          {isUsers && selectedDepartment && (
            <>
              {separator}
              <BreadcrumbItem>
                <BreadcrumbPage className="text-zinc-100 font-semibold">
                  {selectedDepartment}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar
        user={user}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        navItems={navItems}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 shadow-md bg-zinc-950">
          <SidebarTrigger className="-ml-1 text-zinc-100" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {renderBreadcrumb()}
        </header>
        <Separator orientation="horizontal" className="h-2 bg-zinc-200" />
        <div className="flex-1 p-6 pt-0 bg-zinc-950">
          {activeSection === "dashboard" && <AdminDashboardStats />}
          {activeSection === "users" && (
            <ManageUsers
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
            />
          )}
          {activeSection === "events" && <ManageEvents />}
          {activeSection === "create-staff" && <AdminStaffSignup />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
  