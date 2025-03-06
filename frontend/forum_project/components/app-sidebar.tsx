"use client"

import * as React from "react"
import {
  Home,
  Flame,
  Command,
  CircleUserRound,
  LogOut
} from "lucide-react"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { TitleLogo } from "@/components/title-logo"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// sample data.
const data = {
  forumTitle:
    {
      name: "Inspiration Station",
    },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Popular",
      url: "/popular",
      icon: Flame,
      badge: "10",
    },
    {
      title: "Profile",
      url: "/profile",
      icon: CircleUserRound,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "LogOut",
      url: "/login",
      icon: LogOut
    },
  ],
  favorites: [
    {
      name: "Music",
      url: "/search?tags=music",
      emoji: "🎵",
    },
    {
      name: "Art",
      url: "/search?tags=art",
      emoji: "🎨",
    },
    {
      name: "Travel",
      url: "/search?tags=travel",
      emoji: "🧳",
    },
    {
      name: "Books",
      url: "/search?tags=books",
      emoji: "📚",
    },
    {
      name: "Movies",
      url: "/search?tags=movies",
      emoji: "🎥",
    },
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    // <Sidebar className="border-r-0 " {...props}>
    <Sidebar collapsible="icon" className="border-r-0 " {...props}>
      <SidebarHeader>
        <TitleLogo title={data.forumTitle} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
