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
} from "lucide-react";
import React from "react";
import AdminDashboardStats from "./AdminDashStats";
import ManageUsers from "./ManageUsers";
import ManageEvents from "./ManageEvents";

export default function Admin() {
  const [activeSection, setActiveSection] = React.useState("dashboard");

  // Dummy admin user
  const user = {
    id: 1,
    name: "Roni Bhakta",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQEvEHK2KOMLwQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1705087348506?e=1748476800&v=beta&t=IVnehed4T53hvzHeeNxaKQdN9EJknAu4iM4tpBddSvE",
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
      "Hackathon 2024 - Lead Organizer",
      "React Conference - Speaker",
      "CodeFest 2023 - Judge",
    ],
    yearOfPursuing: "3rd",
    yearOfPassing: "2026",
    email: "roni123@gmail.com",
  };

  const navItems = [
    {
      title: "Dashboard",
      icon: SquareTerminal,
      sectionKey: "dashboard",
    },
    {
      title: "Manage Users",
      icon: Users,
      sectionKey: "users",
    },
    {
      title: "Manage Events",
      icon: CalendarDays,
      sectionKey: "events",
    },
  ];

  return (
    <SidebarProvider >
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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-zinc-100">
                  {navItems.find((n) => n.sectionKey === activeSection)?.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 p-6 pt-0 bg-zinc-950" >
          {activeSection === "dashboard" && <AdminDashboardStats/>}
          {activeSection === "users" && <ManageUsers/>}
          {activeSection === "events" && <ManageEvents/>}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}


  