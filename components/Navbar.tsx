"use client";
import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "./ui/sidebar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/app/store/useAppStore";

export default function Navbar() {
  const setUser = useAppStore((state) => state.setUser);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Fehler beim Abmelden", error.message);
    } else {
      setUser(null);
      router.push("/");
    }
  };

  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 bg-background z-10 w-full">
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        <Link href={"/dashboard"}>Dashboard</Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={12}>
            <DropdownMenuLabel className="text-center">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-[1.2rem] w-[1.2rem] mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleLogOut()}
              variant="destructive"
            >
              <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
