import { useState} from "react";
import { 
    Plus,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import axios from 'axios'

export default function CreatePostButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [video, setVideo] = useState('');
    const [photo, setPhoto] = useState('');
    const [showVideoInput, setShowVideoInput] = useState(false)
    const [showPhotoInput, setShowPhotoInput] = useState(false)

    const userData = sessionStorage.getItem('user');
    const token = userData ? JSON.parse(userData).token : null;
    const handlePost = async(title: string, content: string, video: string, photo: string ,tags: string[], e: React.MouseEvent ) => {
        e.preventDefault();
        e.stopPropagation();

        const body: { title: string, content: string, video?: string, photo?: string , tags?: string[] } = {
            title,
            content,
        };
    
        // Conditionally add tags if they are provided
        if (tags && tags.length > 0) {
            body.tags = tags;
        }

        if (video) {
            body.video = video;
        }

        if (photo) {
            body.photo = photo;
        }

        try {   
            const resp = await axios.post('http://localhost:3001/api/posts/create', body, {
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
        <div className="fixed bottom-6 right-6 z-50">
            <button
                className="group flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-lg transition-all hover:w-40"
                onClick={() => setIsOpen(true)}
            >
            <Plus className="size-5" />
            <span className="hidden opacity-0 transition-opacity group-hover:inline group-hover:opacity-100">
                Create Post
            </span>
            </button>
        </div>

        {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Card className="w-[600px] bg-card">
                <CardHeader>
                    <CardTitle>Create a Post</CardTitle>
                    <CardDescription>Share your ideas!</CardDescription>
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

                <button onClick={(e) => {setShowVideoInput((prev) => !prev);}} className="rounded-md bg-secondary text-secondary-foreground mb-3 mr-4 px-4 py-2">
                    Add Video
                </button>

                <button onClick={(e) => {setShowPhotoInput((prev) => !prev);}} className="rounded-md bg-secondary text-secondary-foreground px-4 py-2">
                    Add Photo
                </button>

                {showVideoInput && (
                    <textarea
                    className="w-full h-11 mb-1 rounded-md border p-2"
                    placeholder="Video URL..."
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                    />
                )}

                {showPhotoInput && (
                    <textarea
                    className="w-full h-11 mb-1 rounded-md border p-2"
                    placeholder="Photo URL..."
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    />
                )}

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
                                className="px-4 py-1 bg-accent text-accent-foreground rounded-full flex items-center"
                            >
                                {tag}
                                <span
                                    onClick={() => removeTag(tag)}
                                    className="ml-2 cursor-pointer text-sm text-primary hover:text-gray-600"
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
                        className="rounded-md bg-secondary text-secondary-foreground px-4 py-2"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                    <button onClick={(e) => {handlePost(title, content, video, photo, tags, e); setIsOpen(false); window.location.reload();}} className="rounded-md bg-primary text-primary-foreground px-4 py-2">
                        Post
                    </button>
                </div>
                
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
