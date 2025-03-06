'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header';
import Post, {PostProps} from "@/components/post";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import ProfileCard from '../../components/ProfileCard';
import Link  from 'next/link';
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { ProfileInfo } from '@/components/ProfileCard'
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

interface TabItem{
  name: string;
  href: string;
}

const tabs: TabItem[] = [
  { name: "Posts", href: "/profile" },
  { name: "Replies", href: "/replies" },
  { name: "Likes", href: "/likes" },
  { name: "Media", href: "/media" },
]

export default function Profile() {
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [posts, setPosts] = useState<PostProps[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const _id = searchParams.get("id") || "0";

  useEffect(() => {
    if (!_id) return;
    const fetchProfile = async() => {
      try {
        const resp = await axios.get(`http://localhost:3001/api/users/${_id}`);
        setProfile(resp.data);
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
    
    const fetchPosts = async() => {
      setLoading(true);
      try {
        const resp = await axios.get(`http://localhost:3001/api/posts/user/${_id}`);
        setProfile(resp.data);
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

    fetchPosts();

  }, [_id]);


  if (loading)
    return <p>Loading...</p>

  if (!profile)
    return <p>Profile not found.</p>


  return ( 
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full p-6">
        <SidebarProvider>
        <AppSidebar />
          <SidebarInset>
          <Header />
            <div className="flex flex-col gap-0 px-4 py-10">
              <div className="">
                <div className="flex flex-col items-center justify-center w-full mt-4 space-y-4 border p-6">
                  <ProfileCard _id={profile._id} username={profile.username}/>
                  <nav className="w-full flex justify-evenly space-x-8 border p-2" aria-label="Profile navigation">
                    {tabs.map((tab) => (
                      <Link
                        key={tab.name}
                        href={tab.href}
                        className={cn(
                          "group relative inline-flex h-6 items-center border-b-2 px-1 text-sm font-medium transition-colors hover:text-foreground/80",
                          pathname === tab.href
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground hover:border-muted",
                        )}
                      >
                        {tab.name}
                        {pathname === tab.href && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
                      </Link>
                    ))}
                  </nav>
                  {loading ? (
                    <p>Loading...</p>
                  ) : posts && posts.length > 0 ? (
                    posts.map((post) => (
                      <Post
                        key={post._id}
                        _id={post._id}
                        username={post.username}
                        // username={post.user.username}
                        title={post.title}
                        content={post.content}
                        upvotes={post.upvotes}
                        downvotes={post.downvotes}
                        tags={post.tags}
                        edited={post.edited}
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
      </div>
    </div>
  );
}
