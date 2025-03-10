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
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import ReplyButton from '@/components/reply-button';




export default function PostPage() {
  const searchParams = useSearchParams();
  const _id = searchParams.get("id") || "0";
  const [post, setPost] = useState<PostProps | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [parentCommentId, setParentCommentId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const userData = sessionStorage.getItem('user');
  const token = userData ? JSON.parse(userData).token : null;
  const userId = userData ? JSON.parse(userData)._id : null;

  useEffect(() => {
    if (!_id) return;

    const fetchPost = async() => {
      try {
        const resp = await axios.get(`http://localhost:3001/api/posts/${_id}`, {
          headers: { Authorization: `Bearer ${token}`}
        });
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
        const resp = await axios.put(`http://localhost:3001/api/posts/${_id}/${type}`, {}, {
          headers: { Authorization: `Bearer ${token}`}
        });
        // backend handles the addition of an upvote or downvote
        setPost((prev) => prev ? {...prev, ...resp.data} : prev);
    } catch (error) {
        console.error('Error voting:', error);
    }
  };

  if (!post) 
    return <p>Post not found.</p>;

  const handlePostComment = async(content: string, parentCommentId: string) => {
    const body: {content: string, parentCommentId?: string} = {
      content
    }
    if (parentCommentId && parentCommentId.length > 0) {
      body.parentCommentId = parentCommentId
    }

    try {
      const resp = await axios.post(`http://localhost:3001/api/posts/${_id}`, body, {
        headers: {Authorization: `Bearer ${token}`}
      });
    } catch (error) {
      console.error('Error posting comment:', error);
  }
  }

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
  
    try {
      await axios.delete(`http://localhost:3001/api/posts/${_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      alert("Post deleted successfully.");
      window.location.href = "/"; // Redirect to homepage 
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post. Please try again.");
    }
  };

  // di pa tapos
  const handleEditPost = async () => {

    try{
      await axios.patch(`http://localhost:3001/api/posts/${_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert("Post succesfully edited.");

    } catch (error){
      alert(`Under Construction`)
    }
  }

  const handleEditComments = async () => {

    try{
      await axios.patch(`http://localhost:3001/api/posts/${_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert("Post succesfully edited.");

    } catch (error){
      alert(`Under Construction`)
    }
  }

  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex justify-center px-6 py-10 w-full">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
              
                {/* POST AND TITLE*/}
                <h1 className="text-2xl font-bold">{post.title} {post.edited && <span className="text-gray-500 text-sm">(edited)</span>}</h1>
                <Link href={`/profile?id=${post.user._id}`}>
                  <p className="text-gray-600 flex items-center">
                    <Avatar>
                      <AvatarImage src={post.user.pfp} alt="Avatar" /> 
                    </Avatar>
                    <span className='ml-2'>{post.user?.username || "Unknown User"}</span>
                  </p>
                </Link>
                
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
                    {/* <MessageSquare className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" /> */}
                    {/* <Share2 className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />   */}
                    {/* {post.user._id === userId && <Button className="mt-2" onClick={handleEditPost}>Edit</Button>}
                    {post.user._id === userId && <Button className="mt-2" onClick={handleDeletePost}>Delete</Button>} */}
                  {post.user._id === userId && <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleEditPost}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDeletePost} className="text-red-500">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>}

                      
                </div>


                {/* COMMENT */}
                <div className="mt-3">
                
                <Textarea
                  id="comment-box"
                  placeholder="Write your comment here..."
                  className="w-full mt-2 p-2 border rounded-lg resize-none"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button onClick={(e) => {handlePostComment(newComment, parentCommentId); window.location.reload();}} className="mt-2">Post Comment</Button>
                </div>

                {/* COMMENTS */}
                <h2 className="mt-6 text-xl font-semibold">Comments</h2>
                <div className="mt-3 space-y-4">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment._id} className="p-3 border rounded">
                      <Link href={`/profile?id=${comment.user._id}`}>
                      <div>
                        <p className="text-gray-800 font-semibold flex items-center">
                          <Avatar>
                            <AvatarImage src={comment.user?.pfp || "/default-avatar.png"} alt="Avatar" />
                          </Avatar>
                          <span className='ml-2'>{comment.user?.username || "Anonymous"}</span>
                        </p>
                      </div>
                      
                      </Link>
                      
                      
                      <p>{comment.content} {comment.edited && <span className="text-gray-500 text-sm">(edited)</span>}</p>
                      <ReplyButton/>
                      {comment.user._id === userId && <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                          <Button variant="ghost" size="icon">
                                                            <MoreVertical className="w-5 h-5" />
                                                          </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                          <DropdownMenuItem onClick={handleEditComments}>
                                                            Edit
                                                          </DropdownMenuItem>
                                                          <DropdownMenuItem className="text-red-500">
                                                            Delete
                                                          </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                      </DropdownMenu>}
                      {/* If the comment has nested comments, recursively render them */}
                      {comment.comments && comment.comments.length > 0 && (
                        <div className="ml-4 mt-3 space-y-2">
                          {comment.comments.map((nestedComment) => (
                            <div key={nestedComment._id} className="p-3 border rounded">
                              <p className="text-gray-800 font-semibold">
                              <Avatar>
                                <AvatarImage src={nestedComment.user.pfp} alt="Avatar" /> 
                              </Avatar>
                               {nestedComment.user?.username || "Anonymous"}</p>
                              <p>{nestedComment.content} {nestedComment.edited && <span className="text-gray-500 text-sm">(edited)</span>}</p>
                              {nestedComment.user._id === userId && <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                          <Button variant="ghost" size="icon">
                                                            <MoreVertical className="w-5 h-5" />
                                                          </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                          <DropdownMenuItem onClick={handleEditComments}>
                                                            Edit
                                                          </DropdownMenuItem>
                                                          <DropdownMenuItem className="text-red-500">
                                                            Delete
                                                          </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                      </DropdownMenu>}
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
 

    
