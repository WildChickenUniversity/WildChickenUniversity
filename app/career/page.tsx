import type { ResolvingMetadata } from "next";
import Breadcrumb from "@/components/breadcrumbWrapper";
import buildMetadata from "@/components/buildMetadata";
import OfferText from "./components/offerText.mdx";
import OfferWrapper from "./components/offerWrapper";

export const generateMetadata = (_props: {}, parent: ResolvingMetadata) =>
  buildMetadata(
    {
      title: "Career",
      keywords: [
        "Wild Chicken Career",
        "Wild Chicken University Career",
        "野鸡大学工作岗位",
        "野鸡大学录用通知生成器",
      ],
    },
    parent,
  );

export default function Career() {
  return (
    <div className="flex flex-1 flex-col items-center justify-start mx-auto max-w-5xl w-full p-4 min-h-[calc(100dvh-4rem)]">
      <div className="w-full max-w-2xl">
        <Breadcrumb />
        <h1 className="text-2xl font-bold my-1">
          Wild Chicken University Job Offer
        </h1>
        <div className="mdx-layout font-sm mb-8">
          <OfferText />
        </div>
        <OfferWrapper />
      </div>
    </div>
  );
}
