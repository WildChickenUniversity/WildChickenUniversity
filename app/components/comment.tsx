"use client";
import { useEffect, useState, useRef } from "react";
{
  /* <script src="https://utteranc.es/client.js" repo="WildChickenUniversity/wcu-nextjs" issue-term="title"
        label="ADMISSION COMMENT" theme="github-light" crossorigin="anonymous" async>
        </script> */
}

export default function Comment() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.crossOrigin = "anonymous";
    scriptElement.src = "https://utteranc.es/client.js";

    scriptElement.setAttribute("issue-term", "title");
    scriptElement.setAttribute("label", "WCU Comment");
    scriptElement.setAttribute(
      "repo",
      "WildChickenUniversity/WildChickenUniversity"
    );
    scriptElement.setAttribute("theme", "github-light");

    ref.current?.appendChild(scriptElement);
  }, []);

  return <div ref={ref} />;
}
