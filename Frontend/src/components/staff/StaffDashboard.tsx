import React from "react";
import { AppSidebar } from "@/components/Admin/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Users, CalendarDays } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ManageUsers from "@/components/Admin/ManageUsers";
import ManageEvents from "@/components/Admin/ManageEvents";

export default function StaffDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = React.useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = React.useState<string | null>(null);

  // Determine active section from current path
  const getActiveSection = () => {
    const path = location.pathname;
    if (path.includes("/staff/users")) return "users";
    if (path.includes("/staff/events")) return "events";
    return "users"; // Default to users section
  };

  const activeSection = getActiveSection();

  // Dummy staff user
  const user = {
    id: 2,
    name: "Asma Hannure",
    avatar: "https://ui-avatars.com/api/?name=Staff+Member",
    role: "Staff",
    codeClubRole: "staff",
    skills: [],
    bio: "",
    social: {
      github: "",
      linkedin: "",
      portfolio: ""
    },
    pastEvents: [],
    yearOfPursuing: "",
    yearOfPassing: "",
    email: "hannure@example.com",
  };

  const navItems = [
    {
      title: "Manage Users",
      icon: Users,
      sectionKey: "users",
      path: "/staff/users",
    },
    {
      title: "Manage Events",
      icon: CalendarDays,
      sectionKey: "events",
      path: "/staff/events",
    },
  ];

  const setActiveSection = (section: string) => {
    const navItem = navItems.find(item => item.sectionKey === section);
    if (navItem) {
      navigate(navItem.path);
    }
  };

  // Breadcrumb logic
  const renderBreadcrumb = () => {
    const base = (
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
    );
    const separator = <BreadcrumbSeparator />;

    const sectionMap: Record<string, string> = {
      users: "Manage Users",
      events: "Manage Events",
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
                  navigate("/staff/users");
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
        teamName="Staff"
        teamIcon={Users}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 shadow-md bg-zinc-950">
          <SidebarTrigger className="-ml-1 text-zinc-100" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {renderBreadcrumb()}
        </header>
        <Separator orientation="horizontal" className="h-2 bg-zinc-200" />
        <div className="flex-1 p-6 pt-0 bg-zinc-950">
          {activeSection === "users" && (
            <ManageUsers
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
            />
          )}
          {activeSection === "events" && <ManageEvents />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 