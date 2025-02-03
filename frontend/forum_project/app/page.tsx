'use client'

import Post from "@/components/post";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Plus } from "lucide-react";
import CreatePostButton from "@/components/create-post-button";
import Header from '@/components/Header';

export default function Homepage() {

  return (
    
    <div>
      <div>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header/>
            <div className="flex flex-1 flex-col gap-4 px-4 py-10">
              <div className="mx-auto h-full w-full max-w-3xl rounded-xl">
                <div className="flex flex-col items-center justify-center min-h-screen w-full mt-16 space-y-4">
                <Post id="1" username="Christian" title="I put the new forgis on the jeep" content="I trap until the bloody bottoms is underneath" />
                <Post id="2" username="Christian" title="Hello there!" content="Just saying hello to everyone in the forum." />
                <Post id="3" username="Christian" title="Morning Thoughts" content="Hope you're all having a great day so far!" />
                <Post id="4" username="Christian" title="Exciting News!" content="I just finished my first Next.js project. Feeling accomplished!" />
                <Post id="5" username="Christian" title="Random Musings" content="Sometimes, I wonder if AI will take over the world... or just help us write forum posts." />

                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>

        <CreatePostButton/>
      
      
    </div>
    
  );
}
