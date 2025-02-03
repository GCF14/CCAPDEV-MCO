'use client'

import { useState } from 'react'
import Header from '@/app/profile/Header';
import Post from "@/components/post";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import ProfileCard from './ProfileCard';

export default function Profile() {
  return ( 
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full p-6">
        <SidebarProvider>
        <AppSidebar />
          <SidebarInset>
          <Header />
            <div className="flex flex-col gap-4 px-4 py-10">
              <div className="mx-auto h-full w-full max-w-3xl rounded-xl">
                <div className="flex flex-col items-center justify-center w-full mt-4 space-y-4">
                  <ProfileCard username='Joshua'/>
                  <Post username="Christian" content="First post in the forum" />
                  <Post username="Kellie" content="Hello" />
                  <Post username="Robbie" content="Hi!" />
                  <Post username="Joshua" content="woahhh" />
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
