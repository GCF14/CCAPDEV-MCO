import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'; 
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function ReplyButton({parentCommentId}: {parentCommentId: string}) {
  const searchParams = useSearchParams();
  const _id = searchParams.get("id") || "0";
  const [isOpen, setIsOpen] = useState(false);
  const [newContent, setNewContent] = useState('');
  const userData = sessionStorage.getItem('user');
  const token = userData ? JSON.parse(userData).token : null;
  const handleReply = async(content: string, parentCommentId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const body: { content: string, parentCommentId: string } = {
        content,
        parentCommentId
    };

    try {   
        const resp = await axios.post(`http://localhost:3001/api/posts/${_id}`, body, {
            headers: {Authorization: `Bearer ${token}`}
        });

    
    } catch (error) {
        console.error('Error:', error);
    }
  }
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Reply</Button>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="w-[600px] bg-white">
            <CardHeader>
              <CardTitle>Reply</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full h-11 mb-3 rounded-md border p-2"
                placeholder="Write your reply..."
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
                <button
                  className="rounded-md bg-black text-white px-4 py-2"
                  onClick={(e) => {
                    handleReply(newContent, parentCommentId, e); 
                    window.location.reload();
                    setIsOpen(false);
                  }} 
                >
                  Reply
                </button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

