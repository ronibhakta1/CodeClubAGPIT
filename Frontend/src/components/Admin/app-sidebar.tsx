import * as React from "react";
import { LucideIcon, UserSquare } from "lucide-react";

import { NavMain } from "@/components/Admin/nav-main"; // Admin version
import { NavUser } from "@/components/Admin/nav-user"; // Admin version
import { TeamSwitcher } from "@/components/Admin/team-switcher"; // Admin version
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Define the User type for admin
type User = {
  id: number;
  name: string;
  avatar: string;
  role: string;
  codeClubRole: string;
  skills: string[];
  bio: string;
  social: {
    github: string;
    linkedin: string;
    portfolio: string;
  };
  pastEvents: string[];
  yearOfPursuing: string;
  yearOfPassing: string;
  email: string;
};

// Sidebar props type
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User;
  activeSection: string;
  setActiveSection: (section: string) => void;
  navItems: {
    title: string;
    icon?: LucideIcon;
    sectionKey: string;
    path?: string;
  }[];
  teamName?: string;
  teamIcon?: LucideIcon;
}

// Admin Sidebar Component
export function AppSidebar({
  user,
  activeSection,
  setActiveSection,
  navItems,
  teamName = "Admin",
  teamIcon = UserSquare,
  ...props
}: AppSidebarProps) {
  const data = {
    teams: [
      {
        name: teamName,
        logo: teamIcon,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader className="bg-zinc-950" >
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent className=" bg-zinc-950 text-slate-100" >
        <NavMain
          items={navItems.map((item) => ({
            ...item,
            isActive: activeSection === item.sectionKey,
          }))}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </SidebarContent>

      <SidebarFooter className=" bg-zinc-950 text-slate-100" >
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
