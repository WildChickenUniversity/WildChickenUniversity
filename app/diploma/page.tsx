import type { ResolvingMetadata } from "next";
import Breadcrumb from "@/components/breadcrumbWrapper";
import buildMetadata from "@/components/buildMetadata";
import Comment from "@/components/comment";
import Navbar from "@/components/navbar";
import DiplomaText from "./components/diplomaText.mdx";
import DiplomaWrapper from "./components/diplomaWrapper";

export const generateMetadata = (_props: {}, parent: ResolvingMetadata) =>
  buildMetadata(
    {
      title: "Diploma",
      keywords: [
        "Wild Chicken Diploma",
        "Wild Chicken Certificate",
        "野鸡大学文凭",
        "野鸡大学毕业证",
      ],
    },
    parent,
  );

export default function Diploma() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col items-center justify-center mx-auto max-w-5xl w-full p-4">
        <div className="w-full max-w-2xl">
          <Breadcrumb />
          <h1 className="text-2xl font-bold my-1">
            Wild Chicken University Diploma
          </h1>
          <div className="mdx-layout font-sm mb-8">
            <DiplomaText />
          </div>
          <DiplomaWrapper />
        </div>
      </main>
      <Comment />
    </div>
  );
}
