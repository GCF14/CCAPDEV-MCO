import { useState} from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {Button} from '@/components/ui/button'
import {PostProps} from '@/components/post'
import axios from 'axios'

export default function EditPostButton({_id, title, content, tags}: PostProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newTags, setNewTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const userData = sessionStorage.getItem('user');
    const token = userData ? JSON.parse(userData).token : null;
    setNewTitle(title);
    setNewContent(content);
    if (tags && tags.length > 0)
        setNewTags(tags);

    const handleEditPost = async(title: string, content: string, tags: string[], e: React.MouseEvent ) => {
        e.preventDefault();
        e.stopPropagation();

        const body: { title: string, content: string, tags?: string[] } = {
            title,
            content,
        };
    
        // Conditionally add tags if they are provided
        if (tags && tags.length > 0) {
            body.tags = tags;
        }

        try {   
            const resp = await axios.put(`http://localhost:3001/api/posts/${_id}`, body, {
                headers: {Authorization: `Bearer ${token}`}
            });

        
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            if (!newTags.includes(tagInput.trim())) {
                setNewTags([...newTags, tagInput.trim()]);
            }
            setTagInput(''); // Reset input field
        }
    };

    // to remove a tag
    const removeTag = (tagToRemove: string) => {
        const updatedTags = newTags.filter(tag => tag !== tagToRemove);
        setNewTags(updatedTags);
    };

    return (
    <>
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Card className="w-[600px] bg-white">
                <CardHeader>
                    <CardTitle>Edit Post</CardTitle>
                </CardHeader>
            <CardContent>
                <textarea
                    className="w-full h-11 mb-1 rounded-md border p-2"
                    placeholder="Title..."
                    value={title}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <textarea
                    className="w-full h-40 mb-3 rounded-md border p-2"
                    placeholder="Write something..."
                    value={content}
                    onChange={(e) => setNewContent(e.target.value)}
                />
                <div>
                    <input
                        type='text'
                        className="w-full h-11 rounded-md border p-2"
                        placeholder="Press enter to add a tag (music, movies)"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                     <div className="flex flex-wrap gap-2 mt-2">
                        {newTags.map((tag, index) => (
                            <div
                                key={index}
                                className="px-4 py-1 bg-gray-800 text-white rounded-full flex items-center"
                            >
                                {tag}
                                <span
                                    onClick={() => removeTag(tag)}
                                    className="ml-2 cursor-pointer text-sm text-white hover:text-gray-200"
                                >
                                    {/* x button for removing a tag */}
                                    &#x2715; 
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                
            </CardContent>
            <CardFooter className="flex justify-between">
                
                {/* post and cancel buttons */}
                <div className="flex gap-4" >
                    <button
                        className="rounded-md bg-gray-200 px-4 py-2"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                    <button onClick={(e) => {handleEditPost(newTitle, newContent, newTags, e); window.location.reload();}} className="rounded-md bg-black text-white px-4 py-2">
                        Edit
                    </button>
                </div>
                
            </CardFooter>
          </Card>
        </div>
    </>
  );
}
