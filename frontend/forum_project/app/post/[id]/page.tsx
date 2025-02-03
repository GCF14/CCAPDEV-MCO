'use client';

import { useParams } from 'next/navigation';
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2 } from "lucide-react";



const posts = [
  {
    id: "1",
    username: "Christian",
    title: "I put the new forgis on the jeep",
    content: "Bruh",
    comments: [
      { id: "c1", user: "JaneDoe", text: "Nice post!", edited: false },
      { id: "c2", user: "User123", text: "I disagree!", edited: false },
    ],
  },
  {
    id: "2",
    username: "Christian",
    title: "Hello",
    content: "Just saying hello!",
    comments: [
      { id: "c3", user: "Alice", text: "Hey there!", edited: false }
    ],
  },
  {
    id: "3",
    username: "Christian",
    title: "Hi!",
    content: "Hope you're having a great day!",
    comments: [
      { id: "c4", user: "Bob", text: "You too!", edited: false },
      { id: "c5", user: "Eve", text: "Have a good one!", edited: false },
    ],
  },
  {
    id: "4",
    username: "Christian",
    title: "woahhh",
    content: "Excited about this new forum!",
    comments: [],
  },
  {
    id: "5",
    username: "Christian",
    title: "sheeshhh",
    content: "This looks amazing!",
    comments: [],
  },
];

export default function PostPage() {
  const { id } = useParams(); // Get post ID from URL
  const post = posts.find((p) => p.id === id); // Find the post

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Post not found.
      </div>
    );
  }

  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex justify-center px-6 py-10 w-full">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
              
                {/* POST AND TITLE*/}
                <h1 className="text-2xl font-bold">{post.title}</h1>
                <p className="text-gray-600">By {post.username}</p>
                <p className="mt-4 text-gray-800">{post.content}</p>

                {/* BUTTONS */}
                <div className="flex items-center space-x-2">
                    <ThumbsUp className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />
                    <ThumbsDown className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />
                    <MessageSquare className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />
                    <Share2 className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />    
                </div>


                {/* COMMENT */}
                <div className="mt-6">
                
                <Textarea
                  id="comment-box"
                  placeholder="Write your comment here..."
                  className="w-full mt-2 p-2 border rounded-lg resize-none"
                />
                <Button className="mt-2">Post Comment</Button>
                </div>

                {/* COMMENTS */}
                  <h2 className="mt-6 text-xl font-semibold">Comments</h2>
                <div className="mt-3 space-y-4">
                {post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <div key={comment.id} className="p-3 border rounded">
                      <p className="text-gray-800 font-semibold">{comment.user}</p>
                      <p>{comment.text} {comment.edited && <span className="text-gray-500 text-sm">(edited)</span>}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No comments yet.</p>
                )}

              </div>
            </div>
          </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
