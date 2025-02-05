'use client'

import { useState } from 'react'
import Header from '@/components/Header';
import Post from "@/components/post";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import ProfileCard from '../../components/ProfileCard';
import Link  from 'next/link';
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface TabItem{
  name: string;
  href: string;
}

const tabs: TabItem[] = [
  { name: "Posts", href: "/posts" },
  { name: "Replies", href: "/replies" },
  { name: "Likes", href: "/likes" },
  { name: "Media", href: "/media" },
]

export default function Profile() {

  const pathname = usePathname()

  return ( 
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full p-6">
        <SidebarProvider>
        <AppSidebar />
          <SidebarInset>
          <Header />
            <div className="flex flex-col gap-0 px-4 py-10">
              <div className="">
                <div className="flex flex-col items-center justify-center w-full mt-4 space-y-4 border p-6">
                  <ProfileCard username='Joshua'/>
                  <nav className="w-full flex justify-evenly space-x-8 border p-2" aria-label="Profile navigation">
                    {tabs.map((tab) => (
                      <Link
                        key={tab.name}
                        href={tab.href}
                        className={cn(
                          "group relative inline-flex h-6 items-center border-b-2 px-1 text-sm font-medium transition-colors hover:text-foreground/80",
                          pathname === tab.href
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground hover:border-muted",
                        )}
                      >
                        {tab.name}
                        {pathname === tab.href && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
                      </Link>
                    ))}
                  </nav>
                  <Post id="1" username="Joshua" title="How to Optimize My Python Code for Large Datasets?" content="Hey everyone, I'm working with a dataset containing millions of records, and my Python script runs too slowly. I'm using Pandas, but some operations take minutes to execute. Does anyone have tips on optimizing performance, maybe using NumPy, multiprocessing, or other techniques? Thanks!" />
                  <Post id="2" username="Joshua" title="What’s the Best Open-World RPG of All Time?" content="I’ve played The Witcher 3, Skyrim, and Elden Ring, but I’m wondering if there are any other open-world RPGs that are just as immersive. What’s your favorite and why?" />
                  <Post id="3" username="Joshua" title="Best Places to Visit in Japan for a First-Time Traveler?" content="I’m planning a trip to Japan for two weeks and want to make the most of it. Tokyo and Kyoto are obvious choices, but are there any hidden gems or lesser-known spots I should visit? Any tips would be greatly appreciated!" />
                  <Post id="4" username="Joshua" title="Struggling to Gain Muscle—Need Help!" content="I’ve been working out for six months, but I’m not seeing much muscle growth. I eat clean and train four times a week, but I feel like I’ve hit a plateau. What should I change?" />
                  <Post id="5" username="Joshua" title="Is Oppenheimer Worth Watching?" content="I’m thinking of watching Oppenheimer, but I’m not sure if it’s too slow or complex. For those who’ve seen it, is it worth it?" />
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
        </div>
      </div>
    </div>
  );
}
