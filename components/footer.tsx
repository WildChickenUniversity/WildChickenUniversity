"use client";
import Link from "next/link";
import ModeToggle from "@/components/modeToggle";

export default function Footer() {
  return (
    <footer className="w-full mx-auto p-6">
      <div className="max-w-screen-lg w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm text-gray-500 text-center md:text-left">
          <span className="inline-block rotate-180">&copy;</span>{" "}
          {new Date().getFullYear()}{" "}
          <Link
            href="https://github.com/WildChickenUniversity/WildChickenUniversity"
            className="hover:underline"
          >
            Wild Chicken University
          </Link>{" "}
          by{" "}
          <Link href="https://github.com/Mr-Sheep" className="hover:underline">
            Mr-Sheep
          </Link>
          ;{" "}
          <Link href="/pages/disclaimer" className="hover:underline">
            Assets
          </Link>{" "}
          have their own license.
        </span>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center text-sm gap-x-6 gap-y-2 text-gray-500"
        >
          <Link href="/pages/about" className="hover:underline">
            About
          </Link>
          <Link href="/pages/disclaimer" className="hover:underline">
            Disclaimer
          </Link>
          <Link href="/pages/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/review" className="hover:underline">
            Review
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </footer>
  );
}
