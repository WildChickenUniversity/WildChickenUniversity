"use client";

import Features from "./components/home/features";
import Hero from "./components/home/hero";
import Reviews from "./components/home/reviews";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <Hero />
        <Features />
        <Reviews />
      </div>
    </div>
  );
}
