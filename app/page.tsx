"use client";

import Comment from "@/components/comment";
import Navbar from "@/components/navbar";
import Features from "./components/home/features";
import Hero from "./components/home/hero";
import Reviews from "./components/home/reviews";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div>
        <Hero />
        <Features />
        <Reviews />
        <Comment />
      </div>
    </div>
  );
}
