import Breadcrumb from "@/components/breadcrumbWrapper";
import Navbar from "@/components/navbar";
import DiplomaText from "./components/diplomaText.mdx";
import DiplomaWrapper from "./components/diplomaWrapper";

export const metadata = {
  title: "Diploma",
};

export default function Diploma() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col items-center justify-center mx-auto max-w-screen-lg w-full p-4">
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
    </div>
  );
}
