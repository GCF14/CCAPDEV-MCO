"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import {
  Home,
  Flame,
  CircleUserRound,
} from "lucide-react"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { TitleLogo } from "@/components/title-logo"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Initialize userId state
  const [userId, setUserId] = useState<string | null>(null);
  
  // Move sessionStorage access into useEffect
  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserId(parsedData._id);
    }
  }, []);
  
  // sample data.
  const data = {
    forumTitle: {
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
        // Use a conditional URL that works even if userId is null initially
        url: userId ? `/profile?id=${encodeURIComponent(userId)}` : "/profile",
        icon: CircleUserRound,
        badge: "10",
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
      {
        name: "About",  // Change 'title' to 'name'
        url: "/about",
        emoji: "ℹ️",
      },
    ],
  }

  return (
    // <Sidebar className="border-r-0 " {...props}>
    <Sidebar collapsible="icon" className="border-r-0 " {...props}>
      <SidebarHeader>
        <TitleLogo title={data.forumTitle} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}