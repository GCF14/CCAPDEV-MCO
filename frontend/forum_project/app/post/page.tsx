'use client';

import { useSearchParams } from 'next/navigation';
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2 } from "lucide-react";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {PostProps, CommentProps} from "@/components/post";



export default function PostPage() {
  const searchParams = useSearchParams();
  const _id = searchParams.get("id") || "0";
  const [post, setPost] = useState<PostProps | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<CommentProps[]>([]);
  
  useEffect(() => {
    if (!_id) return;

    const fetchPost = async() => {
      try {
        const resp = await axios.get(`http://localhost:3001/api/posts/${_id}`);
        setPost(resp.data);
        setComments(resp.data.comments);
      } catch(error) {
        console.error("Error fetching post: ", error);
      }
    }

    fetchPost();
  }, [_id]);

  const handleVote = async(type: 'upvote' | 'downvote') => {
    try {
        const resp = await axios.post(`http://localhost:3001/api/posts/${_id}/${type}`);
        // backend handles the addition of an upvote or downvote
        setPost((prev) => prev ? {...prev, ...resp.data} : prev);
    } catch (error) {
        console.error('Error voting:', error);
    }
  };

  if (!post) 
    return <p>Post not found.</p>;

  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex justify-center px-6 py-10 w-full">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
              
                {/* POST AND TITLE*/}
                <h1 className="text-2xl font-bold">{post.title} {post.edited && <span className="text-gray-500 text-sm">(edited)</span>}</h1>
                <p className="text-gray-600">By {post.username}</p>
                <p className="mt-4 text-gray-800">{post.content}</p>
                {/* tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                        <Link href={`/search?tags=${encodeURIComponent(tag)}`} key={tag}>
                            <span className="px-2 py-1 text-sm bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                                {tag}
                            </span>
                        </Link>
                        
                    ))}
                </div>
                )}
                <br/>

                {/* BUTTONS */}
                <div className="flex items-center space-x-2">
                    <button onClick={() => handleVote('upvote')}>
                        <ThumbsUp className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />
                        <span>{post.upvotes}</span>
                    </button>
                    <button onClick={() => handleVote('downvote')}>
                        <ThumbsDown className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />
                        <span>{post.downvotes}</span>
                    </button>
                    <MessageSquare className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />
                    <Share2 className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />  
                    {post.username === "Christian" && <Button className="mt-2">Edit</Button>}
                    {post.username === "Christian" && <Button className="mt-2">Delete</Button>}
                      
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
                    <div key={comment._id} className="p-3 border rounded">
                      <p className="text-gray-800 font-semibold">{comment.username}</p>
                      <p>{comment.content} {comment.edited && <span className="text-gray-500 text-sm">(edited)</span>}</p>
                      {comment.username === "Christian" && <Button>Edit</Button>}
                      {/* If the comment has nested comments, recursively render them */}
                      {comment.comments && comment.comments.length > 0 && (
                        <div className="ml-4 mt-3 space-y-2">
                          {comment.comments.map((nestedComment) => (
                            <div key={nestedComment._id} className="p-3 border rounded">
                              <p className="text-gray-800 font-semibold">{nestedComment.username}</p>
                              <p>{nestedComment.content} {nestedComment.edited && <span className="text-gray-500 text-sm">(edited)</span>}</p>
                              {nestedComment.username === "Christian" && <Button>Edit</Button>}
                            </div>
                          ))}
                        </div>
                      )}
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
 

    
