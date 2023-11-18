export default function Footer() {
  return (
    <footer className="max-w-screen-md w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        <span className="copyleft">©</span>{" "}
        <a href="/" className="hover:underline">
          Wild Chicken University
        </a>
        . Assets have their own licenses.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="/about" className="hover:underline me-4 md:me-6">
            About
          </a>
        </li>
        <li>
          <a href="/no-no" className="hover:underline me-4 md:me-6">
            Disclaimer
          </a>
        </li>
        <li>
          <a href="/privacy" className="hover:underline me-4 md:me-6">
            Privacy Policy
          </a>
        </li>
      </ul>
    </footer>
  );
}
