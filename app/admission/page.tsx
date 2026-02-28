import type { ResolvingMetadata } from "next";
import Breadcrumb from "@/components/breadcrumbWrapper";
import buildMetadata from "@/components/buildMetadata";
import AdmissionText from "./components/admissionText.mdx";
import AdmissionWrapper from "./components/admissionWrapper";

export const generateMetadata = (_props: {}, parent: ResolvingMetadata) =>
  buildMetadata(
    {
      title: "Admission",
      keywords: [
        "Wild Chicken Admission",
        "Wild Chicken University Admission",
        "野鸡大学录取通知书",
        "野鸡大学录取通知书生成器",
      ],
    },
    parent,
  );

export default function Admission() {
  return (
    <div className="flex flex-1 flex-col items-center justify-start mx-auto max-w-5xl w-full p-4 min-h-[calc(100dvh-4rem)]">
      <div className="w-full max-w-2xl">
        <Breadcrumb />
        <h1 className="text-2xl font-bold my-1">
          Wild Chicken University Admission
        </h1>
        <div className="mdx-layout font-sm mb-8">
          <AdmissionText />
        </div>
        <AdmissionWrapper />
      </div>
    </div>
  );
}
