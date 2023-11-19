"use client";
import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Button = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (document.querySelector(".utterances-frame")) {
      const iframe =
        document.querySelector<HTMLIFrameElement>(".utterances-frame");

      if (!iframe) {
        return;
      }
      const t = currentTheme === "light" ? "github-light" : "github-dark";
      iframe?.contentWindow?.postMessage(
        { type: "set-theme", theme: t },
        "https://utteranc.es"
      );
    }
  }, [currentTheme]);

  return (
    isClient && (
      <button
        onClick={() =>
          currentTheme == "dark" ? setTheme("light") : setTheme("dark")
        }
        className="px-1 bg-gray-800 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 transition-all duration-100 text-white dark:text-gray-800 text-sm md:text-sm rounded-lg  "
      >
        {theme === "dark" ? "🌞" : "🌕"}
      </button>
    )
  );
};

export default Button;
