import Post from "@/components/post";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Header from "@/components/Header"

export default function Books() {
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
                    <Post id="22" username="Christian" title="Unputdownable Books" 
                    content="What’s a book you started and just couldn’t put down? I stayed up all night reading The Night Circus! #books" />
                    <Post id="23" username="Kellie" title="Favorite Fictional World?" 
                    content="If you could live in any book universe, where would it be? Middle-earth sounds amazing, but Hogwarts is tempting! #books" />
                    <Post id="24" username="Joshua" title="Plot Twists That Blew Your Mind" 
                    content="No spoilers, but what’s a book that had a plot twist that completely shocked you? I’m still recovering from Gone Girl! #books" />
                    <Post id="25" username="Robbie" title="The Best Book-to-Movie Adaptation?" 
                    content="Some book adaptations are amazing, and some… not so much. Which movie actually did justice to the book? #books #movies" />

                    </div>
                </div>
                </div>
            </SidebarInset>
            </SidebarProvider>
        </div>

    );
}