import Breadcrumb from "@/components/breadcrumbWrapper";
import Comment from "@/components/comment";
import Navbar from "@/components/navbar";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex flex-col items-center justify-center mx-auto max-w-5xl w-full p-4">
        <div className="w-full max-w-2xl ">
          <Breadcrumb />
          <div className={`mdx-layout`}>{children}</div>
        </div>
      </main>
      <Comment />
    </div>
  );
}
