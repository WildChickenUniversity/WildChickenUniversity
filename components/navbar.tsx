"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import ModeToggle from "@/components/modeToggle";
import Chicken from "@/app/components/chicken";
import { navbarPaths } from "@/lib/menuEntries";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="Home" className="pt-4">
            <Chicken size="small" />
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-2">
              {Object.entries(navbarPaths).map(([title, path]) => (
                <NavigationMenuItem
                  key={title}
                  className="font-bold text-xl cursor-pointer hover:text-primary transition-colors"
                >
                  <NavigationMenuLink asChild>
                    <Link href={path}>{title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center">
          <div className="hidden md:block">
            <ModeToggle />
          </div>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-screen mt-2 p-2 bg-background/95 backdrop-blur-sm shadow-lg rounded-lg"
              >
                {Object.entries(navbarPaths).map(([title, path]) => (
                  <DropdownMenuItem
                    className="cursor-pointer px-4 py-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium text-base focus:bg-accent focus:text-accent-foreground"
                    key={title}
                    onClick={() => router.push(path)}
                  >
                    <Link href={path}>{title}</Link>
                  </DropdownMenuItem>
                ))}
                <div className="p-2 flex justify-end">
                  <ModeToggle />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
