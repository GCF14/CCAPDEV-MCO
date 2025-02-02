'use client'

import Post from "@/components/post";

export default function Hompage() {

  return (
    <div>

    <div>
      <h1>Homepage</h1>
    </div>

    <div className="flex flex-col items-center justify-center min-h-screen w-full mt-16 space-y-4">
      <Post username="Christian" content="First post in the forum" />
      <Post username="Christian" content="Hello" />
      <Post username="Christian" content="Hi!" />
      <Post username="Christian" content="woahhh" />
      <Post username="Christian" content="sheeshhh" />
    </div>
  



    </div>
    
    
    
    
  );
}
