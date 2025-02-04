import Post from "@/components/post";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Header from "@/components/Header"

export default function Movies() {
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
                    <Post id="26" username="Christian" title="What’s Your Go-To Comfort Movie?" 
                    content="We all have that one movie we can rewatch anytime. What’s yours? Mine is The Princess Bride! #movies" />
                    <Post id="11" username="Kellie" title="Which Movie Has the Best Soundtrack?" 
                    content="A great soundtrack makes a movie even better. What’s your all-time favorite? Interstellar’s music still gives me chills! #movies #music" />
                    <Post id="28" username="Joshua" title="Underrated Movie Recommendations?" 
                    content="Drop a movie that deserves way more love! I’ll start: Moonlight was incredible but not talked about enough. #movies" />
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