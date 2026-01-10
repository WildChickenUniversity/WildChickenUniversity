"use client";

import { usePathname } from "next/navigation";
import Bread from "@/lib/bread";

const Breadcrumb = () => {
  const pathname = usePathname();
  return <Bread pathname={pathname} />;
};

export default Breadcrumb;
