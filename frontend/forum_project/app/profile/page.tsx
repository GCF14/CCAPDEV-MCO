'use client'

import { useState } from 'react'
import Header from '@/components/Header';
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
                  <Post id="6" username="Joshua" title="First Post!" content="First post in the forum" />
                  <Post id="7" username="Joshua" title="Greetings!" content="Hello" />
                  <Post id="8" username="Joshua" title="Hello" content="Hi!" />
                  <Post id="9" username="Joshua" title="Hi" content="woahhh" />
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
