'use client';

import { useSearchParams } from 'next/navigation';
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2 } from "lucide-react";

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export interface Comment {
//   id: string;
//   username: string;
//   content: string;
//   edited: boolean;
// }

// temp comments
const commentsData: Record<string, { id: string; user: string; text: string; edited: boolean }[]> = {
  "1": [
    { id: "c1", user: "JaneDoe", text: "Nice post!", edited: false },
    { id: "c2", user: "Christian", text: "I disagree!", edited: true },
    { id: "c3", user: "Alice", text: "Hey there!", edited: false },
    { id: "c4", user: "Bob", text: "You too!", edited: false },
    { id: "c5", user: "Eve", text: "Have a good one!", edited: false },
  ],
  "2": [{ id: "c1", user: "JaneDoe", text: "Nice post!", edited: false },
  { id: "c2", user: "User123", text: "I disagree!", edited: false },
  { id: "c3", user: "Alice", text: "Hey there!", edited: false },
  { id: "c4", user: "Bob", text: "You too!", edited: false },
  { id: "c5", user: "Eve", text: "Have a good one!", edited: false },],
  "3": [
    { id: "c1", user: "JaneDoe", text: "Nice post!", edited: false },
    { id: "c2", user: "User123", text: "I disagree!", edited: false },
    { id: "c3", user: "Alice", text: "Hey there!", edited: false },
    { id: "c4", user: "Bob", text: "You too!", edited: false },
    { id: "c5", user: "Eve", text: "Have a good one!", edited: false },
  ],
  "4": [
    { id: "c1", user: "JaneDoe", text: "Nice post!", edited: false },
    { id: "c2", user: "User123", text: "I disagree!", edited: false },
    { id: "c3", user: "Alice", text: "Hey there!", edited: false },
    { id: "c4", user: "Bob", text: "You too!", edited: false },
    { id: "c5", user: "Eve", text: "Have a good one!", edited: false },
  ],
  "5": [
    { id: "c1", user: "JaneDoe", text: "Nice post!", edited: false },
    { id: "c2", user: "User123", text: "I disagree!", edited: false },
    { id: "c3", user: "Alice", text: "Hey there!", edited: false },
    { id: "c4", user: "Bob", text: "You too!", edited: false },
    { id: "c5", user: "Eve", text: "Have a good one!", edited: false },
  ],
};

export default function PostPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "0";
  const title = searchParams.get("title") || "Untitled Post";
  const content = searchParams.get("content") || "No content available.";
  const username = searchParams.get("username") || "Unknown";
  const comments = commentsData[id] || [];

  // const [comments, setComments] = useState<Comment[]>([]);
  // const [newComment, setNewComment] = useState<string>('');
  // if (post) {
  //   const [likes, setLikes] = useState(post.upvotes);
  //   const [dislikes, setDislikes] = useState(post.downvotes);
  //   const handleVote = async(type: 'upvote' | 'downvote') => {
  //     try {
  //         const resp = await axios.post('http://localhost:3001/api/posts/${id}/${type}');
  //         if (type === 'upvote') {
  //             setLikes(likes + 1);
  //         } else {
  //             setDislikes(dislikes + 1);
  //         }
  //     } catch (error) {
  //         console.error('Error voting:', error);
  //     }
  //   };
  //   useEffect(() => {
  //     const fetchPost = async() => {
  //       const resp = await axios.get('http://localhost:3001/api/posts/${id}');
  //         setPost(resp.data.post);
  //         setComments(resp.data.comments);
        
  //     }
  //     fetchPost();
  //   }, [id])
    return (
      <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <div className="flex justify-center px-6 py-10 w-full">
              <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
                
                  {/* POST AND TITLE*/}
                  <h1 className="text-2xl font-bold">{title}</h1>
                  <p className="text-gray-600">By {username}</p>
                  <p className="mt-4 text-gray-800">{content}</p>

                  {/* BUTTONS */}
                  <div className="flex items-center space-x-2">
                      {/* <button onClick={() => handleVote('upvote')}>
                          <ThumbsUp className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />
                          <span>{likes}</span>
                      </button>
                      <button onClick={() => handleVote('downvote')}>
                          <ThumbsDown className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />
                          <span>{dislikes}</span>
                      </button> */}
                      <ThumbsUp className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />
                      <ThumbsDown className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />
                      <MessageSquare className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />
                      <Share2 className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />  
                      <Button className="mt-2">Edit</Button>  
                      <Button className="mt-2">Delete</Button>  
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
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div key={comment.id} className="p-3 border rounded">
                        {/* <p className="text-gray-800 font-semibold">{comment.username}</p>
                        <p>{comment.content} {comment.edited && <span className="text-gray-500 text-sm">(edited)</span>}</p>
                        {comment.username === "Christian" && <Button>Edit</Button>} */}
                        <p className="text-gray-800 font-semibold">{comment.user}</p>
                        <p>{comment.text} {comment.edited && <span className="text-gray-500 text-sm">(edited)</span>}</p>
                        {comment.user === "Christian" && <Button>Edit</Button>}
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
  // }
}
 

    
