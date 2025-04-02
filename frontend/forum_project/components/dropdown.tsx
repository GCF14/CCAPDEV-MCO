import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { MoreVertical } from "lucide-react";
import {Button} from '@/components/ui/button'


interface DropdownProps {
    onEdit: () => void;
    onDelete: () => void;
}

export default function Dropdown({ onEdit, onDelete }: DropdownProps) {
 
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {/* Edit action */}
                <DropdownMenuItem onClick={() => onEdit()}>
                    Edit
                </DropdownMenuItem>

                {/* Delete action */}
                <DropdownMenuItem 
                    onClick={onDelete} 
                    className="text-red-500"
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

