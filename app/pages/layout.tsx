"use client";
import { useEffect, useState } from "react";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // Create any shared layout or styles here
  return (
    isClient && (
      <div className="mdx-layout max-w-screen-lg w-full py-8 lg:py-16 px-4 mdx-layout mx-auto flex min-h-screen flex-col justify-between ">
        {children}
      </div>
    )
  );
}
