'use client'
import {useEffect, useState} from 'react';
import Post, {PostProps} from "@/components/post";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Header from "@/components/Header"
import CreatePostButton from "@/components/create-post-button";
import axios from 'axios';
import { useLogout } from "@/hooks/useLogout"
import { useRouter } from 'next/navigation';
import withAuth from "@/components/withAuth";
import { ModeToggle } from "@/components/mode-toggle";

function Homepage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useLogout();
  const router = useRouter();
  const userData = sessionStorage.getItem('user');
  const token = userData ? JSON.parse(userData).token : null;

  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/`, {
          headers: { Authorization: `Bearer ${token}`}
        });
        setPosts(resp.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Error fetching posts');
        } else {
          setError('An unexpected error occured');
        }
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, [token]); // Add token to the dependency array

  if (error)
    return <p>Error: {error}</p>

  const handleClick = () => {
    logout()
    router.push('/login')
  }

  return (
    <div>
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
                  {loading ? (
                    <p>Loading...</p>
                  ) : posts.length > 0 ? (
                    posts.map((post) => (
                      <Post
                        key={post._id}
                        _id={post._id}
                        user={post.user}
                        title={post.title}
                        content={post.content}
                        video={post.video}
                        photo={post.photo}
                        upvotes={post.upvotes}
                        downvotes={post.downvotes}
                        tags={post.tags}
                        edited={post.edited}
                        upvotedBy={post.upvotedBy} 
                        downvotedBy={post.downvotedBy}
                      />
                    ))
                  ) : (
                    <p>No posts available.</p>
                  )}
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
      
      {/* Header controls container with flex to position buttons side by side */}
      <div className="absolute top-5 right-5 flex items-center gap-2">
        <ModeToggle />
        <button 
          onClick={handleClick} 
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md shadow-md hover:bg-gray-800 dark:hover:bg-gray-200 transition"
        >
          Log out
        </button>
      </div>
      
      <CreatePostButton/>
    </div>
  );
}

export default withAuth(Homepage);