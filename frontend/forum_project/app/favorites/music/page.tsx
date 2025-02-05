import Post from "@/components/post";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Header from "@/components/Header"

export default function Music() {
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
                    <Post id="10" username="Christian" title="The Magic of Live Concerts 🎤✨" 
                    content="There's nothing quite like the energy of a live concert! The lights, the crowd, and the raw emotion of the music make for an unforgettable experience. What’s the best concert you’ve ever been to? #music" />
                    <Post id="11" username="Kellie" title="Which Movie Has the Best Soundtrack?" 
                    content="A great soundtrack makes a movie even better. What’s your all-time favorite? Interstellar’s music still gives me chills! #movies #music" />
                    <Post id="12" username="Joshua" title="Best Song for a Road Trip?" 
                    content="Need some fresh tracks for my next drive. Drop your favorites! #music" />
                    <Post id="13" username="Robbie" title="Favorite Throwback Song?" 
                    content="What’s a song that instantly takes you back in time? #music" />

                    </div>
                </div>
                </div>
            </SidebarInset>
            </SidebarProvider>
        </div>

    );
}