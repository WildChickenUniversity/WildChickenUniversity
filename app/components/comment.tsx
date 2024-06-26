"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

{
  /* <script src="https://utteranc.es/client.js" repo="WildChickenUniversity/wcu-nextjs" issue-term="title"
        label="ADMISSION COMMENT" theme="github-light" crossorigin="anonymous" async>
        </script> */
}

export default function Comment() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const t = currentTheme === "light" ? "github-light" : "github-dark";

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const existingScript = document.getElementById("utterances-script");
    if (existingScript) return;

    const scriptElement = document.createElement("script");
    scriptElement.id = "utterances-script";
    scriptElement.async = true;
    scriptElement.crossOrigin = "anonymous";
    scriptElement.src = "https://utteranc.es/client.js";

    scriptElement.setAttribute("issue-term", "title");
    scriptElement.setAttribute("label", "WCU Comment");
    scriptElement.setAttribute(
      "repo",
      "WildChickenUniversity/WildChickenUniversity"
    );
    scriptElement.setAttribute(
      "theme",
      currentTheme === "light" ? "github-light" : "github-dark"
    );

    ref.current?.appendChild(scriptElement);
  }, []);

  return <div ref={ref} />;
}
