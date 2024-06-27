"use client";
import Image from "next/image";
import TWrapper from "./typewriter";
import React from "react";

const Chicken: React.FC = () => {
  return (
    <div className="relative flex flex-col place-items-center before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[200px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[150px]">
      <Image
        className="relative block dark:hidden"
        src="/Wild_Chicken.svg"
        alt="WCU Logo"
        width={270}
        height={55.5}
        priority
      />
      <Image
        className="relative hidden dark:block"
        src="/Wild_Chicken_White.svg"
        alt="WCU Logo"
        width={270}
        height={55.5}
        priority
      />

      <div className="dark:text-gray-300 font-semibold text-center text-sm mt-5">
        Member of{" "}
        <a className="underline-animation" href="https://github.com/U4Group">
          U4 Group of GitHub Research Universities
        </a>
      </div>
      <div className="dark:text-gray-300 font-semibold text-center text-sm mt-2">
        <TWrapper />
      </div>
    </div>
  );
};

export default Chicken;
