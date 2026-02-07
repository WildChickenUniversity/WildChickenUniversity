import type { ResolvingMetadata } from "next";
import Breadcrumb from "@/components/breadcrumbWrapper";
import buildMetadata from "@/components/buildMetadata";
import Comment from "@/components/comment";
import Navbar from "@/components/navbar";
import ReviewCarousel from "@/components/review/reviewCarousel";
import Disclaimer from "./disclaimer.mdx";

export const generateMetadata = (_props: {}, parent: ResolvingMetadata) =>
  buildMetadata(
    {
      title: "Review",
      keywords: [
        "Wild Chicken Univeristy Rating",
        "野鸡大学评价",
        "野鸡大学评分",
      ],
    },
    parent,
  );

export default function Review() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex flex-col items-center justify-center mx-auto max-w-5xl w-full p-4">
        <div className="w-full max-w-2xl">
          <Breadcrumb />
          <h1 className="text-2xl font-bold my-1">Reviews</h1>
          <ReviewCarousel />

          <div className="mdx-layout text-sm">
            <Disclaimer />
          </div>
        </div>
      </main>
      <Comment />
    </div>
  );
}
