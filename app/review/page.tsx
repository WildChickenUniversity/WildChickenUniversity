import type { ResolvingMetadata } from "next";
import Breadcrumb from "@/components/breadcrumbWrapper";
import buildMetadata from "@/components/buildMetadata";
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
    <div className="flex flex-1 flex-col items-center justify-start mx-auto max-w-5xl w-full p-4 min-h-[calc(100dvh-4rem)]">
      <div className="w-full max-w-2xl">
        <Breadcrumb />
        <h1 className="text-2xl font-bold my-1">Reviews</h1>
        <ReviewCarousel />
        <div className="mdx-layout text-sm">
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}
