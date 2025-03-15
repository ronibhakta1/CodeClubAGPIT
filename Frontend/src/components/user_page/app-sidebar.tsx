import * as React from "react"
import { Navbars } from "@/components/user_page/nav-bars"
import { NavUser } from "@/components/user_page/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Roni Bhakta",
    email: "roni@email.com",
    avatar: "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg",
  },
  
  Navbar: [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Events",
      url: "/events",
    },
    {
      name: "Main Board",
      url: "/members",
    },
    {
      name: "About",
      url: "/about",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        
      </SidebarHeader>
      <SidebarContent>
        <Navbars  navbar={data.Navbar} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
