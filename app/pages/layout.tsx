import Breadcrumb from "@/components/breadcrumbWrapper";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="flex flex-1 flex-col items-center justify-start mx-auto max-w-5xl w-full p-4 min-h-[calc(100dvh-4rem)]">
      <div className="w-full max-w-2xl ">
        <Breadcrumb />
        <div className={`mdx-layout`}>{children}</div>
      </div>
    </div>
  );
}
