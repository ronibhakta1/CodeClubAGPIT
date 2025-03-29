import { NavUser } from "@/components/user_page/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavbarItem {
  name: string;
  url: string;
}

interface User {
  id: number;
  name: string;
  avatar: string;
  email: string;
}

interface SidebarProps {
  setActiveSection: (section: string) => void;
  user: User;
  navbar: NavbarItem[];
}

export function AppSidebar({ setActiveSection, user, navbar }: SidebarProps) {
  return (
    <Sidebar collapsible="icon" className="bg-black text-black h-full w-64">
      <SidebarHeader className="p-4 text-lg font-semibold border-b border-black">
        Profile
      </SidebarHeader>
      <SidebarContent className="p-2 space-y-2">
        {navbar.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveSection(item.name.toLowerCase().replace(" ", ""))}
            className={cn(
              "w-full flex items-center px-4 py-2 text-left rounded-md transition",
              "hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-black"
            )}
          >
            {item.name}
          </button>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-white p-4">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;