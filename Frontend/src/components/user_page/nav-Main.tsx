
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function Navbars({
  navbar,
}: {
  navbar: {
    name: string
    url: string
  }[]
}) {
  const {  } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel></SidebarGroupLabel>
      <SidebarMenu  className=" w-f">
        {navbar.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        
      </SidebarMenu>
    </SidebarGroup>
  )
}
