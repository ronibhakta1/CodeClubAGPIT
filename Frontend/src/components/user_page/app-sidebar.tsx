import * as React from "react";
import { GalleryVerticalEnd, LucideIcon } from "lucide-react";

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
        logo: GalleryVerticalEnd,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={navItems.map((item) => ({
            ...item,
            isActive: activeSection === item.sectionKey,
          }))}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;