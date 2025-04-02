'use client'
import Post, {PostProps} from "@/components/post";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Header from "@/components/Header"
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Popular() {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async() => {
        try {
            const userData = sessionStorage.getItem('user');
            const token = userData ? JSON.parse(userData).token : null;

            const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/popular`, {
                headers: {Authorization: `Bearer ${token}`}
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
    }, []);

    if (error)
        return <p>Error: {error}</p>

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
                            )
                        }
                    </div>
                </div>
                </div>
            </SidebarInset>
            </SidebarProvider>
        </div>

    );
}