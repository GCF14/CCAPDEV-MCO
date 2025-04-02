'use client';

import { useSearchParams } from 'next/navigation';
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2 } from "lucide-react";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {PostProps, CommentProps} from "@/components/post";

import Comment from '@/components/comment'
import Dropdown from '@/components/dropdown'

import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";
import EditPostEvent from '@/components/edit-post-button';


const convertToEmbedURL = (url: string) => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
      // Extract YouTube Video ID and return embedded URL
      let videoId = "";
      if (url.includes("youtube.com")) {
          const urlParams = new URL(url).searchParams;
          videoId = urlParams.get("v") || "";
      } else if (url.includes("youtu.be")) {
          videoId = url.split("/").pop() || "";
      }
      return `https://www.youtube.com/embed/${videoId}`;
  } 
  
  // If it's not YouTube, assume it's a direct MP4 file and embed it
  return url;
};


export default function PostPage() {
  const searchParams = useSearchParams();
  const _id = searchParams.get("id") || "0";
  const [post, setPost] = useState<PostProps | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  
  // Changed these to use state to avoid server-side errors
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // Access browser APIs only after component mounts
  useEffect(() => {
    const storedUserData = sessionStorage.getItem('user');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      setToken(parsedUserData.token);
      setUserId(parsedUserData._id);
    }
  }, []);

  
  useEffect(() => {
    if (!_id || !token) return;

    const fetchPost = async() => {
      try {
        const resp = await axios.get(`http://localhost:3001/api/posts/${_id}`, {
          headers: { Authorization: `Bearer ${token}`}
        });
        setPost(resp.data);
        setComments(resp.data.comments);
        setIsUpvoted(resp.data.upvotedBy?.includes(userId));
        setIsDownvoted(resp.data.downvotedBy?.includes(userId));
      } catch(error) {
        console.error("Error fetching post: ", error);
      }
    }

    fetchPost();
  }, [_id, token, userId]);



  const handleVote = async(type: 'upvote' | 'downvote') => {
    if (!token) return;
    
    try {
        const resp = await axios.patch(`http://localhost:3001/api/posts/${_id}/${type}`, {}, {
          headers: { Authorization: `Bearer ${token}`}
        });
        // backend handles the addition of an upvote or downvote
        setPost((prev) => prev ? {...prev, ...resp.data} : prev);
        setIsUpvoted(resp.data.upvotedBy.includes(userId));
        setIsDownvoted(resp.data.downvotedBy.includes(userId));
    } catch (error) {
        console.error('Error voting:', error);
    }
  };

  if (!post) 
    return <p>Post not found.</p>;

  const handlePostComment = async(content: string) => {
    if (!token) return;
    
    const body: {content: string} = {
      content
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
    if (!token) return;
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

                {/* SUBSET OF POST */}

                { post.video && (
                    <div className="mt-3">
                        <iframe
                            className="w-full h-64 rounded-lg"
                            src={convertToEmbedURL(post.video)}
                            title="Video Player"
                            allowFullScreen
                        />
                    </div>
                )}

                { post.photo && (
                    <div className="mt-3 mb-3">
                        <img src={post.photo} alt="Post Image" className="w-full rounded-lg" />
                    </div>
                )}

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
                    <button onClick={() => handleVote('upvote')}
                    className={`flex items-center space-x-1 transition-transform ${
                    isUpvoted ? "text-blue-500 scale-110 font-bold" : "text-gray-600 hover:text-blue-500 hover:scale-110"
                    }`}>
                      <ThumbsUp className="w-5 h-5" />
                      <span>{post.upvotes}</span>
                    </button>
                    <button onClick={() => handleVote('downvote')}
                    className={`flex items-center space-x-1 transition-transform ${
                    isDownvoted ? "text-red-500 scale-110 font-bold" : "text-gray-600 hover:text-red-500 hover:scale-110"
                    }`}>
                      <ThumbsDown className="w-5 h-5" />
                      <span>{post.downvotes}</span>
                    </button>
                  
                  {post.user._id === userId && 
                  <div>

                  <Dropdown
                    onEdit={() => setIsEditModalOpen(true)}
                    onDelete={handleDeletePost}
                  />
                  </div>
                  }

                      
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
                <Button onClick={(e) => {handlePostComment(newComment); window.location.reload();}} className="mt-2">Post Comment</Button>
                </div>

                {isEditModalOpen && (
                  <EditPostEvent postId={post._id} isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} />
                )}

                {/* COMMENTS */}
                <h2 className="mt-6 text-xl font-semibold">Comments</h2>
                <div className="mt-3 space-y-4">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                    <Comment 
                      key={comment._id}
                      _id={comment._id}
                      user={comment.user}
                      content={comment.content}
                      edited={comment.edited}
                      comments={comment.comments}
                      postId={_id}
                    />
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