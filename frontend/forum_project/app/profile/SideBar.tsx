import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Bell, Home, Inbox, Search, Settings } from "lucide-react"

export default function SideBar(){

  const items = [
    {
      title: "Home",
      url: "../",
      icon: Home,
    },
    {
      title: "Search",
      url: "https://www.google.com/",
      icon: Search,
    },
    {
      title: "Notification",
      url: "https://www.google.com/",
      icon: Bell,
    },
    {
      title: "Inbox",
      url: "https://www.google.com/",
      icon: Inbox,
    },
    {
      title: "Settings",
      url: "https://www.google.com/",
      icon: Settings,
    },
  ]

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Logo</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>

  );
}


