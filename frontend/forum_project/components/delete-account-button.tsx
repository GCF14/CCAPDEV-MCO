import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const DeleteAccountButton = () => {
  const router = useRouter();

  const userData = sessionStorage.getItem('user');
  const token = userData ? JSON.parse(userData).token : null;
  const userId = userData ? JSON.parse(userData)._id : null;
  const username = userData ? JSON.parse(userData).username : null;

  console.log("User ID:", userId);

  

  

  const handleClick = async () => {

    const confirm = window.confirm("Are you sure you want to delete your account?")

    if(confirm){
      if (!userId || !token) {
        console.log("User ID or token not found");
        return;
      }
  
      try {
  
        // Fetch all post of the user
        const { data: posts } = await axios.get(`http://localhost:3001/api/posts/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // Fetch all user replies
        const { data: comments } = await axios.get(`http://localhost:3001/api/posts/user/${userId}/comments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
  
        if(comments.length > 0){
          // Delete all comments by user (fixed API call)
          await axios.delete(`http://localhost:3001/api/posts/user/${userId}/comments`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(`All comments by ${username} have been deleted`);
        }
  
        console.log("Deleting posts:", posts.map((post: any) => post._id));
  
        if(posts.length > 0){
          // Delete all posts
          await Promise.all(
            posts.map((post: any) =>
              axios.delete(`http://localhost:3001/api/posts/${post._id}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
            )
          );
          console.log("All posts deleted successfully");
        }
        
  
        
  
        // Delete user account
        const response = await axios.delete(`http://localhost:3001/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.status === 200) {
          alert('Account deleted successfully');
          sessionStorage.removeItem('user'); // Deletes user from session
          router.push('/login'); // Redirect to login page
        } else {
          console.error('Failed to delete account');
        }
      } catch (error: any) {
        console.error('Error deleting account:', error.response?.data || error.message);
        alert('An error occurred while deleting your account.');
      }
    }
    else {
      alert("Account not deleted");
    }
    
  };

  return (
    <Button className='bg-red-600 ml-2' onClick={handleClick}>
      Delete
    </Button>
  );
};

export default DeleteAccountButton;