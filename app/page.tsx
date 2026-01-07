"use client";

import Navbar from "../components/navbar";
import Hero from "./components/hero";
import Features from "./components/features";
import Reviews from "./components/reviews";
import Comment from "./components/comment";
import Alumni from "./components/alumni";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      {/* <Alumni /> */}
      <Reviews />
      <Comment />
    </div>
  );
}
