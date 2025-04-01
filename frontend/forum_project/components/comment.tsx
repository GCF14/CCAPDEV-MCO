import {CommentProps} from "@/components/post";
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
import Link from 'next/link';
import { MoreVertical } from "lucide-react";
import ReplyButton from '@/components/reply-button';
import { Button } from "@/components/ui/button";
import Dropdown from '@/components/dropdown'
import axios from 'axios'
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";


export default function Comment({_id, user, content, edited, comments, postId}: CommentProps) {
    const userData = sessionStorage.getItem('user');
    const token = userData ? JSON.parse(userData).token : null;
    const userId = userData ? JSON.parse(userData)._id : null;
    const [isOpen, setIsOpen] = useState(false);
    const [newContent, setNewContent] = useState(""); // Store edited content
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);


    const handleDeleteComment = async () => {
        if (!window.confirm("Are you sure you want to delete this comment?")) return;
      
        try {
          await axios.delete(`http://localhost:3001/api/posts/${postId}/comments/${_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
      
          alert("Comment deleted successfully.");
          window.location.reload();
        } catch (error) {
          console.error("Error deleting comment:", error);
          alert("Failed to delete the comment. Please try again.");
        }
    }

      const openEditModal = (commentId: string, commentContent: string) => {
        setEditingCommentId(commentId);
        setNewContent(commentContent); // Pre-fill with existing comment content
        setIsOpen(true);
      };
    
      const handleEditComment = async () => {
        if (!editingCommentId) return;
    
        try {
          await axios.patch(
            `http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/posts/${postId}/comments/${editingCommentId}`,
            { content: newContent },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert("Comment successfully edited.");
          setIsOpen(false);
          window.location.reload();
        } catch (error) {
          alert(`Error updating comment`);
        }
      }
    
    return (
      <div key={_id} className="p-3 border rounded">
        <Link href={`/profile?id=${user._id}`}>
          <div>
            <p className="text-gray-800 font-semibold flex items-center">
              <Avatar>
                <AvatarImage src={user?.pfp || "/default-avatar.png"} alt="Avatar" />
              </Avatar>
              <span className="ml-2">{user?.username || "Anonymous"}</span>
            </p>
          </div>
        </Link>
  
        <p>
          {content} {edited && <span className="text-gray-500 text-sm">(edited)</span>}
        </p>

        <div className="flex mt-2 gap-1">
        <ReplyButton parentCommentId={_id}/>
  
        {user._id === userId && (
            <Dropdown
                onEdit={() => openEditModal(_id, content)}
                onDelete={handleDeleteComment} 
            />
        )}
        </div>
        

        {/* Modal for editing comment */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="w-[600px] bg-white">
            <CardHeader>
              <CardTitle>Edit Comment</CardTitle>
            </CardHeader>
            <CardContent>
              Content:
              <textarea
                className="w-full h-40 mb-3 rounded-md border p-2"
                placeholder="Write something..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-4">
                <button
                  className="rounded-md bg-gray-200 px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button onClick={handleEditComment} className="rounded-md bg-black text-white px-4 py-2">
                  Edit
                </button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
  
        {/* Recursive Rendering for Nested Comments */}
        {comments && comments.length > 0 && (
          <div className="ml-4 mt-3 space-y-2">
            {comments.map((nestedComment) => (
              <Comment
                key={nestedComment._id}
                _id={nestedComment._id}
                user={nestedComment.user}
                content={nestedComment.content}
                edited={nestedComment.edited}
                comments={nestedComment.comments}
                postId={postId} />
            ))}
          </div>
        )}
      </div>
    );
  };