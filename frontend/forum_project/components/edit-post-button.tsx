import { useState} from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {Button} from '@/components/ui/button'

import axios from 'axios'

export default function EditPostButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const userData = sessionStorage.getItem('user');
    const token = userData ? JSON.parse(userData).token : null;
    const handlePost = async(title: string, content: string, tags: string[], e: React.MouseEvent ) => {
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
            const resp = await axios.put('http://localhost:3001/api/posts/create', body, {
                headers: {Authorization: `Bearer ${token}`}
            });

        
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput(''); // Reset input field
        }
    };

    // to remove a tag
    const removeTag = (tagToRemove: string) => {
        const updatedTags = tags.filter(tag => tag !== tagToRemove);
        setTags(updatedTags);
    };

    return (
    <>
        <Button onClick={() => setIsOpen(true)}>Edit Post</Button>

        {isOpen && (
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
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full h-40 mb-3 rounded-md border p-2"
                    placeholder="Write something..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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
                        {tags.map((tag, index) => (
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
                    <button onClick={(e) => {handlePost(title, content, tags, e); setIsOpen(false); window.location.reload();}} className="rounded-md bg-black text-white px-4 py-2">
                        Edit
                    </button>
                </div>
                
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
