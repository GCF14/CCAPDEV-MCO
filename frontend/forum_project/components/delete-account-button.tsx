import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const DeleteAccountButton = () => {
  const router = useRouter(); // To redirect user after deletion

  const userData = sessionStorage.getItem('user');
  const token = userData ? JSON.parse(userData).token : null;
  const userId = userData ? JSON.parse(userData)._id : null; // Extract user ID

  console.log(userId)

  const handleClick = async () => {
    if (!userId) {
      console.log("User ID not found");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Account deleted successfully');
        sessionStorage.removeItem('user'); // deletes the user in the  session
        router.push('/login'); // redirect to tehlogin page
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Button className='bg-red-600 ml-2' onClick={handleClick}>
      Delete
    </Button>
  );
};

export default DeleteAccountButton;
