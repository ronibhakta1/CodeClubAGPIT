import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type Team = {
  name: string;
  logo: React.ElementType;
  role?: string; // Optional: replace 'plan' with 'role' for admin context
};

export function TeamSwitcher({ teams }: { teams: Team[] }) {
  const [activeTeam] = React.useState<Team>(teams[0]);

  if (!activeTeam) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="bg-zinc-950 text-slate-100 hover:bg-zinc-950 "
              >
                <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <activeTeam.logo className="size-4" />
                    </div>
                <div className="grid flex-1 text-left text-sm">
                  <span className="truncate font-medium">Admin</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
    </SidebarMenu>
  );
}
