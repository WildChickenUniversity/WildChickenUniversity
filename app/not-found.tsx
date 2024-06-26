"use client";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image
        src="/chicken_operator.jpg"
        alt="Chicken Operator"
        width={200}
        height={200}
        className="chicken-operator"
        unoptimized
      />
      <p className="text-xs mb-4 text-center">
        <Link href="https://www.flickr.com/photos/cowlet/29082018/in/photostream/">
          source of picture
        </Link>
      </p>
      <h1 className="text-4xl font-bold">404 - Bawk Bawk!</h1>
      <p className="m-4 text-center">
        Sorry, the subscriber you dialed is busy now, please redial later.
      </p>

      <Link href="/">
        <button className="bg-slate-500 py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 m-2">
          Home
        </button>
      </Link>
    </div>
  );
}
