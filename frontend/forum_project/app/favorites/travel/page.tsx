import Post from "@/components/post";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Header from "@/components/Header"

export default function Travel() {
    return(
        <div>
            <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="p-6 pb-0">
                <Header />
                </div>
                <div className="flex flex-1 flex-col gap-4 px-4 pb-10">
                <div className="mx-auto h-full w-full max-w-3xl rounded-xl">
                    <div className="flex flex-col items-center justify-center min-h-screen w-full mt-16 space-y-4">
                    <Post id="18" username="Christian" title="Dream Destination?" 
                    content="If you could teleport anywhere right now, where would you go? #travel" />
                    <Post id="19" username="Kellie" title="Solo Travel: Worth It?" 
                    content="Thinking about taking my first solo trip, but I’m nervous. Any tips or must-visit places for a solo traveler? #travel" />
                    <Post id="20" username="Joshua" title="Best Local Food You’ve Ever Had" 
                    content="I had the best street tacos in Mexico City. What’s a food experience that blew your mind while traveling? #travel" />
                    <Post id="21" username="Robbie" title="Hidden Gems" 
                    content="We all know about the big tourist spots, but what’s a lesser-known place that totally amazed you? #travel" />

                    </div>
                </div>
                </div>
            </SidebarInset>
            </SidebarProvider>
        </div>

    );
}