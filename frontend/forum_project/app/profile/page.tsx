'use client'
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";
import { useState, useEffect, Suspense } from 'react'
import Header from '@/components/Header';
import Post, {PostProps, CommentProps} from "@/components/post";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import ProfileCard from '../../components/ProfileCard';
import { cn } from "@/lib/utils"
import { ProfileInfo } from '@/components/ProfileCard'
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

interface TabItem{
  name: string;
  href: string;
}

const tabs: TabItem[] = [
  { name: "Posts", href: "#posts" },
  { name: "Replies", href: "#replies" },
]

// Loading fallback component
function ProfileFallback() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-lg">Loading profile...</div>
    </div>
  );
}

// Content component that uses useSearchParams
function ProfileContent() {
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [posts, setPosts] = useState<PostProps[] | null>([]);
  const [comments, setComments] = useState<CommentProps[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('posts');
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const _id = searchParams.get("id") || "0";

  // Initialize token safely with useEffect
  useEffect(() => {
    // This code will only run in the browser
    const storedUserData = sessionStorage.getItem('user');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setToken(parsedUserData.token);
    }
  }, []); 

  useEffect(() => {
    // Only run the API calls after we have the token
    if (!_id || !token) return;
    
    const fetchProfile = async() => {
      try {
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${_id}`, {
          headers: {Authorization: `Bearer ${token}`}
        });
        if(resp.status == 200) {
          setProfile(resp.data);
          setLoading(false);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Error fetching profile');
        } else {
          setError('An unexpected error occured');
        }
        setLoading(false);
      }
    };

    const fetchPosts = async() => {
      setLoading(true);
      try {
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/user/${_id}`, {
          headers: {Authorization: `Bearer ${token}`}
        });
        setPosts(resp.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Error fetching profile');
        } else {
          setError('An unexpected error occured');
        }
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/user/${_id}/comments`, {
          headers: {Authorization: `Bearer ${token}`}
        });
        setComments(resp.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Error fetching profile');
        } else {
          setError('An unexpected error occured');
        }
        setLoading(false);
      }
    };

    fetchProfile();
    fetchPosts();
    fetchComments();
  }, [_id, token]);

  if (loading)
    return <p>Loading...</p>

  if (error)
    return <p>{error}</p>

  if (!profile)
    return <p>Profile not found.</p>


  return (
    <div className="flex flex-col gap-0 px-4 py-10">
      <div className="">
        <div className="flex flex-col items-center justify-center w-full mt-4 space-y-4 border p-6">
          <ProfileCard _id={profile._id} username={profile.username} pfp={profile.pfp} bio={profile.bio}/>
          <nav className="w-full flex justify-evenly space-x-8 border p-2" aria-label="Profile navigation">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name.toLowerCase())}
                className={cn(
                  "group relative inline-flex h-6 items-center border-b-2 px-1 text-sm font-medium transition-colors hover:text-foreground/80",
                  activeTab === tab.name.toLowerCase()
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-muted",
                )}
              >
                {tab.name}
                {activeTab === tab.name.toLowerCase() && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
              </button>
            ))}
          </nav>
          {activeTab === 'posts' && (
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : posts && posts.length > 0 ? (
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
          )}
          {activeTab === 'replies' && (
            <div className="mt-3 space-y-4">
              {loading ? (
                <p>Loading...</p>
              ) : comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="p-3 border rounded">
                    <p className="text-gray-800 dark:text-gray-200 font-semibold flex items-center">
                      <Avatar>
                        <AvatarImage src={comment.user.pfp} alt="Avatar" />
                      </Avatar>
                      <span className='ml-2'>{comment.user.username}</span>
                    </p>
                    <p>{comment.content} {comment.edited && <span className="text-gray-500 text-sm">(edited)</span>}</p>
                  </div>
                ))
              ) : (
                <p>No replies yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main wrapper component
export default function Profile() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full p-6">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header />
              <Suspense fallback={<ProfileFallback />}>
                <ProfileContent />
              </Suspense>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
    </div>
  );
}