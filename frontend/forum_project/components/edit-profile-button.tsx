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

interface User {
    _id: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    pfp: string;
    bio: string;
}

export default function EditProfileButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [newPfp, setNewPfp] = useState<string>('');
    const [newUsername, setNewUsername] = useState<string>('');
    const [newBio, setNewBio] = useState<string>('');
    const userData = sessionStorage.getItem('user');
    const userId = userData ? JSON.parse(userData)._id : null;
    const token = userData ? JSON.parse(userData).token : null;


    // handler for editing the profile
    const handleEdit = async (newPfp: string, newUsername: string, newBio: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    
        if (!token) {
            console.error("No token found. User may not be logged in.");
            return;
        }

        // need to figure this out
        // try { // get all users to check if username exists
        //     const resp = await axios.get('http://localhost:3001/api/users/usernames', {
        //         headers: { Authorization: `Bearer ${token}` },
        //     });
        //     const usernames = resp.data;
        //     console.log(usernames);
        //     const usernamesLower = usernames.map((username: string) => username.toLowerCase())
        //     if (usernamesLower.includes(newUsername.trim().toLowerCase())) {
        //         alert("Username already in use");
        //         return;
        //     } 
    
        // } catch (error) {
        //     console.error("Error fetching users:", error);
        //     alert("Failed to update profile. Please try again.");
        // }
        

        const body: { pfp?: string; username?: string; bio?: string } = {};
        
        if (newPfp.trim()) body.pfp = newPfp;
        if (newUsername.trim()) body.username = newUsername;
        if (newBio.trim()) body.bio = newBio;
    
        if (Object.keys(body).length === 0) {
            alert("No changes made.");
            return;
        }

        try {
            const res = await axios.patch(`http://localhost:3001/api/users/edit/${userId}`, body, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            alert("Profile updated successfully!");
            setIsOpen(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };
    


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
                        placeholder="johnDoe"
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
                        className="w-full h-11 mb-1 rounded-md border p-2"
                        placeholder="https://api.dicebear.com/9.x/thumbs/svg?seed=samplepfp"
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