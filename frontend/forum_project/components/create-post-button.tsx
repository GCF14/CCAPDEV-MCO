import { useState } from "react";
import { 
    Plus,
    Paperclip,
    Image,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function CreatePostButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
        <div className="fixed bottom-6 right-6 z-50">
            <button
                className="group flex items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-white shadow-lg transition-all hover:w-40 hover:bg-black"
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
            <Card className="w-[600px] bg-white">
                <CardHeader>
                    <CardTitle>Create a Post</CardTitle>
                    <CardDescription>Share your ideas!</CardDescription>
                </CardHeader>
            <CardContent>
                <textarea
                    className="w-full h-40 rounded-md border p-2"
                    placeholder="Write something..."
                />
            </CardContent>
            <CardFooter className="flex justify-between">
                {/* attachment buttons */}
                <div className="flex text-gray-500">
                    <button className="p-2 rounded-full hover:bg-gray-200 transition">
                    <Paperclip className="size-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-200 transition">
                    <Image className="size-5" />
                    </button>
                </div>
                {/* post and cancel buttons */}
                <div className="flex gap-4" >
                    <button
                        className="rounded-md bg-gray-200 px-4 py-2"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                    <button className="rounded-md bg-black text-white px-4 py-2">
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
