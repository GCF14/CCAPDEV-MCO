'use client'

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { useState } from 'react'
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

export default function Profile() {

  const items = [
    {
      title: "Home",
      url: "https://www.google.com/",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "https://www.google.com/",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "https://www.google.com/",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "https://www.google.com/",
      icon: Search,
    },
    {
      title: "Settings",
      url: "https://www.google.com/",
      icon: Settings,
    },
  ]

  return ( 
    // <h1 className="text-3xl font-bold">Profile</h1>
    <div className="flex justify-center items-center">
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
    </div>
  );
}
