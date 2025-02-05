
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LogOut } from "lucide-react";

export default function Header(){

  return (
    <div className="flex justify-center items-center w-full px-10">
      {/* for left side spacing */}
      {/* <div className="w-12"></div> */}
      <div className="flex items-center w-1/2 space-x-2">
        <Input 
          type="email" 
          placeholder="Search 'Website Name'"
          className="w-full h-12"
          />
        <Button type="submit">Search  </Button>
      </div>
      {/* <Button><LogOut /></Button> */}
    </div>
  );

}