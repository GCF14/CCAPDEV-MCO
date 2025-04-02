"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define a generic type parameter for component props
export default function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthWrapper(props: P) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const userData = sessionStorage.getItem("user");
      const token = userData ? JSON.parse(userData).token : null;

      if (!token) {
        router.push("/login"); 
      } else {
        setLoading(false);
      }
    }, [router]); // Add router to dependency array

    if (loading) return <p>Loading...</p>; 

    return <Component {...props} />;
  };
}