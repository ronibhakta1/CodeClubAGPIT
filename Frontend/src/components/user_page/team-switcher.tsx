
import { User } from "lucide-react";

import {
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function TeamSwitcher() {
  return (
        <SidebarMenuButton
          size="lg"
          className="hover:bg-black"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-white">
          <User size={24} color="white" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight ">
            <span className="truncate font-medium text-white">Profile</span>
          </div>
        </SidebarMenuButton>
  )
}
