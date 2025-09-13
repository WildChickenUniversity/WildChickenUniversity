"use client";

import Chicken from "./components/chicken";
import Navbar from "../components/navbar";
import { Separator } from "@/components/ui/separator";
import TypewriterWrapper from "./components/typewritterWraper";
import HomeButton from "./components/homeButton";
import { menuEntries } from "@/lib/menuEntries";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center md:pt-0 relative">
        <div className="flex-col items-center flex">
          <Chicken />
          <Separator className="mt-4" />
          {TypewriterWrapper()}
        </div>

        <div className="md:absolute mt-12 md:mt-0 bottom-8 flex flex-col md:flex-row gap-2 md:gap-4">
          {Object.entries(menuEntries).map(([title, tagline]) => (
            <HomeButton key={title} title={title} tagline={tagline} />
          ))}
        </div>
      </main>
    </div>
  );
}
