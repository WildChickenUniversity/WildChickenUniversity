"use client";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

/* Original Utterances script reference:
  <script src="https://utteranc.es/client.js" repo="WildChickenUniversity/wcu-nextjs" issue-term="title"
        label="ADMISSION COMMENT" theme="github-light" crossorigin="anonymous" async>
  </script>
*/

export default function Comment() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const giscusTheme = (resolvedTheme || theme) === "dark" ? "dark" : "light";

  useEffect(() => {
    if (!mounted || !ref.current) {
      return;
    }

    const container = ref.current;

    const scriptElement = document.createElement("script");
    scriptElement.src = "https://giscus.app/client.js";
    scriptElement.async = true;
    scriptElement.crossOrigin = "anonymous";

    const attributes = {
      "data-repo": "WildChickenUniversity/WildChickenUniversity",
      "data-repo-id": "R_kgDOGUpEIQ",
      "data-mapping": "number",
      "data-term": "17",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": giscusTheme,
      "data-lang": "en",
      "data-loading": "lazy",
    };

    Object.entries(attributes).forEach(([key, value]) => {
      scriptElement.setAttribute(key, value);
    });

    container.innerHTML = "";

    container.appendChild(scriptElement);
  }, [mounted, giscusTheme]);

  if (!mounted) {
    return <div className="min-h-[200px]" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-screen-lg w-full p-4 py-12 xs:py-20 px-6 ">
      <h1 className="mb-12 text-3xl md:text-4xl font-bold text-center tracking-tight px-6">
        Comments
      </h1>
      <div className="w-full max-w-2xl" ref={ref}>
        <div className="text-center text-muted-foreground py-8">Loading Giscus...</div>
      </div>
    </div>
  );
}
