import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  } from "@/components/ui/card";
import axios from 'axios'
import { useState } from "react";
import {ProfileInfo} from '@/components/ProfileCard'
import {Button} from '@/components/ui/button'


export default function EditProfileButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState<ProfileInfo[] | null>([]);
    const [newPfp, setNewPfp] = useState<string>('');
    const [newUsername, setNewUsername] = useState<string>('');
    const [newBio, setNewBio] = useState<string>('');

    const userData = sessionStorage.getItem('user');
    const token = userData ? JSON.parse(userData).token : null;

    const handleEdit = async(pfp: string, username: string, bio: string, e: React.MouseEvent ) => {
        e.preventDefault();
        e.stopPropagation();

        const body: {pfp?: string, username?: string, bio?: string } = {
        };

        // Conditionally add pfp, username, bio
        if (pfp && pfp.length > 0) {
            body.pfp = pfp;
        }
        if (username && username.length > 0) {
            body.username = username;
        }
        if (bio && bio.length > 0) {
            body.bio = bio;
        }

        try {   
            const res = await axios.get('http://localhost:3001/api/users/', {
                headers: {Authorization: `Bearer ${token}`}
            });
            setUsers(res.data);
            if (!users) {
                return;
            }
            // need to check for if username is taken already

            const resp = await axios.put('http://localhost:3001/api/users/edit', body, {
                headers: {Authorization: `Bearer ${token}`}
            });

        
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>
            {isOpen && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <Card className="w-[600px] bg-white">
                    <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                    </CardHeader>
                <CardContent>
                    Username:
                    <input
                        type='text'
                        className="w-full h-11 mb-1 rounded-md border p-2"
                        placeholder="JohnDoe"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    Bio:
                    <textarea
                        className="w-full h-40 mb-3 rounded-md border p-2"
                        placeholder="Write something..."
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                    />
                    Profile Picture:
                    <input
                        type='text'
                        className="w-full h-11 rounded-md border p-2"
                        placeholder="Image link..."
                        value={newPfp}
                        onChange={(e) => setNewPfp(e.target.value)}
                    />
                         
                    
                </CardContent>
                <CardFooter className="flex justify-between">
                    
                    {/* edit and cancel buttons */}
                    <div className="flex gap-4" >
                        <button
                            className="rounded-md bg-gray-200 px-4 py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </button>
                        <button onClick={(e) => {handleEdit(newPfp, newUsername, newBio, e); setIsOpen(false); window.location.reload();}} className="rounded-md bg-black text-white px-4 py-2">
                            Edit
                        </button>
                    </div>
                    
                </CardFooter>
              </Card>
            </div>
          )} 
        </div>
        
    

        
    )
    

}