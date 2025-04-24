import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
  }[]
}) {

  const [activeTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="bg-zinc-950 text-slate-100 hover:bg-zinc-950 hover:text-slate-100"
        >
          <div className=" bg-zinc-950 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeTeam.logo className="size-4" />
              </div>
          <div className="grid flex-1 text-left text-sm">
            <span className="truncate font-medium">Profile</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
