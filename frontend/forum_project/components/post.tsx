import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import React from "react";


interface PostProps {
    id: string;
    username: string;
    title: string;
    content: React.ReactNode;
}

import { ThumbsUp, ThumbsDown, MessageSquare, Share2 } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === "string") return node; // If it's already a string, return it
    if (typeof node === "number") return node.toString(); // Convert numbers to strings
    return ""; // Ignore anything else (like JSX)
  };


export default function Post({id, username, title, content }: PostProps) {
    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                    <AvatarImage src='/profile-pic.jpg' alt="Avatar" />
                    <AvatarFallback>
                        <span className="material-symbols-rounded medium">
                        account_circle
                        </span>
                    </AvatarFallback>
                    </Avatar>

                    <HoverCard>
                    <Link href="/profile">
                    <HoverCardTrigger className="hover:underline font-medium">
                        {username}
                    </HoverCardTrigger>
                    </Link>
                    <HoverCardContent className="w-80">
                        <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src="/profile-pic.jpg" />
                            <AvatarFallback>
                            <span className="material-symbols-rounded medium">
                                account_circle
                            </span>
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{username}</p>
                            
                        </div>
                        </div>
                    </HoverCardContent>
                    </HoverCard>
                </div>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle> 
            </CardHeader>

            <CardContent>     
        
                <CardDescription>{content}</CardDescription>               
            </CardContent>
            <CardFooter>
                <div className="flex items-center space-x-2">
                    <ThumbsUp className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />
                    <ThumbsDown className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />
                    <MessageSquare className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />
                    <Share2 className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500 hover:scale-110 transition-transform" />    
                    <Link href={`/post?id=${id}&title=${encodeURIComponent(title)}&username=${encodeURIComponent(username)}&content=${encodeURIComponent(getTextContent(content))}`}>
                        <Button variant="outline">View Post</Button>
                    </Link>                  
                </div>

                
            </CardFooter>
        </Card>

    )

}