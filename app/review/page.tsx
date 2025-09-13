"use client";
import React from "react";
import Navbar from "@/components/navbar";
import Disclaimer from "./mdx/disclaimer.mdx";

import ReviewCard from "./components/reviewCard";
import { usePathname } from "next/navigation";

import Bread from "@/lib/bread";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// hacky way to import all reviews in mdx directory
const importAll = (r: __WebpackModuleApi.RequireContext) => {
  const filePaths = r.keys();

  const filteredPaths = filePaths.filter((path) => path !== "./disclaimer.mdx");

  const sortedPaths = filteredPaths.sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
  );

  return sortedPaths.map((path) => r(path).default);
};

const reviews = importAll(require.context("./mdx", false, /\.mdx$/));

export default function Review() {
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex flex-col items-center justify-center mx-auto max-w-screen-lg w-full p-4">
        <div className="w-full max-w-2xl">
          <Bread pathname={pathname} />
          <h2 className="text-2xl font-bold my-1">Reviews</h2>

          <div className="my-4">
            <Carousel opts={{ align: "start", loop: true }}>
              <CarouselContent>
                {reviews.map((ReviewComponent, index) => (
                  <CarouselItem key={index} className="md:basis-1/2">
                    <div className="p-1">
                      <ReviewCard ReviewComponent={ReviewComponent} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <div className="mdx-layout text-sm">
              <Disclaimer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
