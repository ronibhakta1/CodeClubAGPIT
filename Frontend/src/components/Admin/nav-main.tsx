"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
  activeSection,
  setActiveSection,
}: {
  items: {
    title: string
    icon?: LucideIcon
    isActive?: boolean
    sectionKey: string
    path?: string
    items?: {
      title: string
      sectionKey: string
      path?: string
    }[]
  }[]
  activeSection: string
  setActiveSection: (section: string) => void
}) {
  const navigate = useNavigate();

  const handleNavigation = (item: any) => {
    if (item.path) {
      navigate(item.path);
    } else {
      setActiveSection(item.sectionKey);
    }
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => handleNavigation(item)}
                  className={
                    activeSection === item.sectionKey ? "bg-zinc-900" : ""
                  }
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {item.items && item.items.length > 0 && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>

              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.sectionKey}>
                        <SidebarMenuSubButton
                          onClick={() => handleNavigation(subItem)}
                          className={
                            activeSection === subItem.sectionKey
                              ? "bg-zinc-900 text-white"
                              : ""
                          }
                        >
                          {subItem.title}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
