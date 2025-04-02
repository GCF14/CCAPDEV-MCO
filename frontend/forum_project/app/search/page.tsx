'use client'
import Post, {PostProps} from "@/components/post";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Header from "@/components/Header"
import {useState, useEffect, Suspense} from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

// Create a client component that uses the search params
function SearchContent() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";
    const tags = searchParams.get("tags") || "";
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    
    // Move sessionStorage access into useEffect
    useEffect(() => {
        try {
            const userData = sessionStorage.getItem('user');
            if (userData) {
                const parsedData = JSON.parse(userData);
                setToken(parsedData.token);
            }
        } catch (err) {
            console.error('Error accessing session storage:', err);
        }
    }, []);
    
    // Only fetch posts when token is available
    useEffect(() => {
        if (!token) return;
        
        const fetchPosts = async() => {
            try {
                let url = '';
                if (search) {
                    url = `http://localhost:3001/api/posts/search/${search}`;
                } else if (tags) {
                    url = `http://localhost:3001/api/posts/search/tags/${tags}`;
                } else {
                    setLoading(false);
                    return;
                }
                
                const resp = await axios.get(url, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setPosts(resp.data);
                setLoading(false);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message || 'Error fetching posts');
                } else {
                    setError('An unexpected error occurred');
                }
                setLoading(false);
            }
        };
        
        fetchPosts();
    }, [search, tags, token]);

    if (!search && !tags) {
        return null;
    }

    if (error)
        return <p>Error: {error}</p>

    return (
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
    );
}

// Fallback loading component
function SearchFallback() {
    return <div className="flex justify-center items-center h-screen">Loading search results...</div>
}

// Main page component
export default function Search() {
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
                    <Suspense fallback={<SearchFallback />}>
                        <SearchContent />
                    </Suspense>
                </div>
                </div>
            </SidebarInset>
            </SidebarProvider>
        </div>
    );
}