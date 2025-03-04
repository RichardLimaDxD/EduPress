import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookUser, LogOut, SquareUser } from "lucide-react";
import Link from "next/link";
import { useUsers } from "@/hooks/users.hook";
import { UsersProps } from "@/interfaces/users.interface";

const UserDropdown = ({ user }: { user: UsersProps }) => {
  const { logout } = useUsers();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full gap-2 justify-start px-2 cursor-pointer"
        >
          <Avatar className="w-7 h-7 block">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <p>{user?.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        <Link passHref href="/my-courses">
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <BookUser size={16} />
            My courses
          </DropdownMenuItem>
        </Link>
        <Link passHref href="/account">
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <SquareUser size={16} />
            User settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={logout}
          className="gap-2 text-red-500 hover:text-red-500 cursor-pointer"
        >
          <LogOut size={16} cursor="pointer" className="hover:text-red-500" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserDropdown };
