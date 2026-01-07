"use client";
import Navbar from "@/components/navbar";
import Disclaimer from "./disclaimer.mdx";

import { usePathname } from "next/navigation";

import Bread from "@/lib/bread";
import ReviewCarousel from "@/components/review/reviewCarousel";

export default function Review() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex flex-col items-center justify-center mx-auto max-w-screen-lg w-full p-4">
        <div className="w-full max-w-2xl">
          <Bread pathname={pathname} />
          <h2 className="text-2xl font-bold my-1">Reviews</h2>
          <ReviewCarousel />
          
          <div className="mdx-layout text-sm">
            <Disclaimer />
          </div>
        </div>
      </main>
    </div>
  );
}
