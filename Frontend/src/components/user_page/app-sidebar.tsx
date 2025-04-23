import * as React from "react";
import { GalleryVerticalEnd, LucideIcon ,UserSquare  } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "@/components/user_page/nav-user";
import { TeamSwitcher } from "@/components/user_page/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

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

export function AppSidebar({
  user,
  activeSection,
  setActiveSection,
  navItems,
  ...props
}: {
  user: User;
  activeSection: string;
  setActiveSection: (section: string) => void;
  navItems: {
    title: string;
    icon?: LucideIcon;
    sectionKey: string;
  }[];
} & React.ComponentProps<typeof Sidebar>) {
  const data = {
    teams: [
      {
        name: "Profile",
        logo: UserSquare ,
      },
    ],
  };

  return (
    
      <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-neutral-950">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-neutral-950">
        <NavMain
          items={navItems.map((item) => ({
            ...item,
            isActive: activeSection === item.sectionKey,
          }))}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </SidebarContent>
      <SidebarFooter className="text-slate-100 bg-neutral-950 ">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    
  );
}
