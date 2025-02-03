'use client'

import Post from "@/components/post";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Plus } from "lucide-react";
import CreatePostButton from "@/components/create-post-button";

export default function Homepage() {

  return (
    
    <div>
      <div>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 px-4 py-10">
              <div className="mx-auto h-full w-full max-w-3xl rounded-xl">
                <div className="flex flex-col items-center justify-center min-h-screen w-full mt-16 space-y-4">
                  <Post username="Christian" content="First post in the forum" />
                  <Post username="Christian" content="Hello" />
                  <Post username="Christian" content="Hi!" />
                  <Post username="Christian" content="woahhh" />
                  <Post username="Christian" content="sheeshhh" />
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
