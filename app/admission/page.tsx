import type { ResolvingMetadata } from "next";
import Breadcrumb from "@/components/breadcrumbWrapper";
import buildMetadata from "@/components/buildMetadata";
import Navbar from "@/components/navbar";
import AdmissionForm from "./components/admissionForm";
import AdmissionText from "./components/admissionText.mdx";
import NoticeText from "./components/noticeText.mdx";
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col items-center justify-center mx-auto max-w-screen-lg w-full p-4">
        <div className="w-full max-w-2xl">
          <Breadcrumb />
          <h1 className="text-2xl font-bold my-1">
            Wild Chicken University Admission
          </h1>
          <div className="mdx-layout font-sm mb-8">
            <AdmissionText />
          </div>
          <AdmissionWrapper />
          <div className="mdx-layout font-sm mt-8">
            <NoticeText />
          </div>
        </div>
      </main>
    </div>
  );
}
