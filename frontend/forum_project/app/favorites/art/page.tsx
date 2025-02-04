import Post from "@/components/post";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Header from "@/components/Header"

export default function Art() {
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
                    <Post id="14" username="Christian" title="Digital vs. Traditional" 
                    content="Which one do you prefer? I love the texture of real paint, but digital is so versatile! #art" />
                    <Post id="15" username="Kellie" title="Color Theory is Wild" 
                    content="Did you know blue and orange make the best contrast? What’s your favorite combo? #art" />
                    <Post id="16" username="Joshua" title="Street Art Appreciation" 
                    content="Murals turn cities into galleries. Seen any cool ones lately? #art" />
                    <Post id="17" username="Robbie" title="The Perfect Brush" 
                    content="Finding the right brush is like finding a magic wand. What’s your favorite? #art" />

                    </div>
                </div>
                </div>
            </SidebarInset>
            </SidebarProvider>
        </div>

    );
}