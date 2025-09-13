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

  const utterancesTheme =
    (resolvedTheme || theme) === "dark" ? "github-dark" : "github-light";

  useEffect(() => {
    if (!mounted || !ref.current) {
      return;
    }

    const container = ref.current;

    const scriptElement = document.createElement("script");
    scriptElement.src = "https://utteranc.es/client.js";
    scriptElement.async = true;
    scriptElement.crossOrigin = "anonymous";

    scriptElement.setAttribute(
      "repo",
      "WildChickenUniversity/WildChickenUniversity"
    );
    scriptElement.setAttribute("issue-term", "title");
    scriptElement.setAttribute("label", "WCU Comment");
    scriptElement.setAttribute("theme", utterancesTheme);

    container.innerHTML = "";

    container.appendChild(scriptElement);
  }, [mounted, utterancesTheme]);

  if (!mounted) {
    return <div className="min-h-[200px]" />;
  }

  return <div className="min-h-[200px]" ref={ref} />;
}
