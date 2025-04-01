"use client"

import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TitleLogo({
  title,
}: {
  title: {
    name: string
    // logo: React.ElementType
  }
}) {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex w-fit items-center gap-2 px-1.5">
          <span className="truncate font-semibold">{title.name}</span>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
