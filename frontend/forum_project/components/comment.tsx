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
import EditCommentButton from '@/components/edit-comment-button'
import { Button } from "@/components/ui/button";
import Dropdown from '@/components/dropdown'
import axios from 'axios'


export default function Comment({_id, user, content, edited, comments, postId}: CommentProps) {
    const userData = sessionStorage.getItem('user');
    const token = userData ? JSON.parse(userData).token : null;
    const userId = userData ? JSON.parse(userData)._id : null;
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
    
      const handleEditComment = async () => {
        try{
          await axios.patch(`http://localhost:3001/api/posts/${postId}/comments/${_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          alert("Post succesfully edited.");
    
        } catch (error){
          alert(`Under Construction`)
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
        <ReplyButton />
  
        {user._id === userId && (
          <div className="mt-3">
            <EditCommentButton />
            <Dropdown
                onEdit={handleEditComment}
                onDelete={handleDeleteComment} 
            />
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