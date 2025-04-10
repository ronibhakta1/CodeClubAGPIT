import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Navbars({
  navbar,
}: {
  navbar: {
    name: string;
    url: string;
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        Navigation
      </SidebarGroupLabel>
      <SidebarMenu className="w-full space-y-1">
        {navbar.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              className={cn(
                "flex items-center gap-3 w-full px-4 py-2 text-sm font-medium rounded-lg transition",
                "hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              )}
            >
              <Link to={item.url} className="flex-1 truncate">
                {item.name}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}