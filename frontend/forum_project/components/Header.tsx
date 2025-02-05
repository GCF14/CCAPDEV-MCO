
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header(){

  return (
    <div className="flex justify-between items-center w-full px-10 border border-gray-300 rounded-lg">
      <Github size={64}></Github>

      <div className="flex items-center w-1/2 space-x-2">
        <Input 
          type="search" 
          placeholder="Search 'Website Name'"
          className="w-full h-12"
          />
        <Button type="submit">Search  </Button>
      </div>
      
      <Github size={64}></Github>
    </div>
  );

}