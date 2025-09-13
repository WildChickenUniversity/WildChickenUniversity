"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/navbar";
import Bread from "@/lib/bread";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Create any shared layout or styles here
  return (
    isClient && (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex flex-col items-center justify-center mx-auto max-w-screen-lg w-full p-4">
          <div className="w-full max-w-2xl ">
            <Bread pathname={pathname} />
            <div
              className={`mdx-layout ${geistSans.variable} ${geistMono.variable}`}
            >
              {children}
            </div>
          </div>
        </main>
      </div>
    )
  );
}
