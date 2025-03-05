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

export default function Homepage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const resp = await axios.get('http://localhost:3001/api/posts/');
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
  }, []);

  if (loading)
    return <p>Loading...</p>;

  if (error)
    return <p>Error: {error}</p>

  
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
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <Post
                      key={post.id}
                      id={post.id}
                      username={post.username}
                      // username={post.user.username}
                      title={post.title}
                      content={post.content}
                      upvotes={post.upvotes}
                      downvotes={post.downvotes}
                      tags={post.tags}
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
        <CreatePostButton/>  
    </div>
  );
}
