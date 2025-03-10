import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'; // Assuming these are from your UI components

const ReplyButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

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
              <label className="block mb-2">Reply:</label>
              <input
                type="text"
                className="w-full h-11 mb-3 rounded-md border p-2"
                placeholder="Write your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
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
                  onClick={() => {
                    console.log('Reply submitted:', replyText); // Replace with API call if needed
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

export default ReplyButton;
