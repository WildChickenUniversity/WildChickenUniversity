import { useState, useEffect } from "react";
import Image from "next/image";
import TWrapper from "./typewriter";
import React from "react";
import { useTheme } from "next-themes";

const Chicken: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="relative flex flex-col place-items-center before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[200px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[150px]">
      <Image
        className="relative "
        src={theme === "dark" ? "/Wild_Chicken_White.svg" : "/Wild_Chicken.svg"}
        alt="WCU Logo"
        width={180}
        height={37}
        priority
      />
      <div className="dark:text-gray-300 font-semibold text-center text-sm mt-2">
        <TWrapper />
      </div>
    </div>
  );
};

export default Chicken;
