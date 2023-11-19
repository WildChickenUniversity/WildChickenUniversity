export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="mdx-layout flex min-h-screen flex-col justify-between p-24">
      {children}
    </div>
  );
}
