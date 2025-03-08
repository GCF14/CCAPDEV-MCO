"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(Component: React.FC) {
  return function AuthWrapper(props: any) {
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
    }, []);

    if (loading) return <p>Loading...</p>; 

    return <Component {...props} />;
  };
}
