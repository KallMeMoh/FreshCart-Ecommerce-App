'use client';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';

export default function AvatarDropdown() {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    router.replace('/login');
    return <div></div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:text-emerald-600 cursor-pointer">
        <Avatar className="outline-1 outline-emerald-500">
          <AvatarImage src="#" alt="avatar" />
          <AvatarFallback>
            {session.user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.replace('/user')}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.replace('/address')}
        >
          Addresses
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.replace('/wishlist')}
        >
          Wishlist
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
