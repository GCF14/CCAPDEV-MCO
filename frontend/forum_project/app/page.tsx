'use client'

import Post from "@/components/post";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Plus } from "lucide-react";

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

      <div className="fixed bottom-6 right-6">
        <button className="group flex items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-white shadow-lg transition-all hover:w-40 hover:bg-black">
          <Plus className="size-5" />
          <span className="hidden opacity-0 transition-opacity group-hover:inline group-hover:opacity-100">
            Create Post
          </span>
        </button>
      </div>
      
    </div>
    
    

    
    
    
    
  );
}
