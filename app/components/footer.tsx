import Button from "./theme-switch";

export default function Footer() {
  return (
    <div className=" dark:text-gray-300 dark:bg-gray-950 max-w-screen w-full mx-auto p-4 md:flex md:items-center md:justify-between">
      <div className="max-w-screen-lg w-full mx-auto p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm max-w-screen-lg text-gray-500 sm:text-center dark:text-gray-300">
          <span className="copyleft">©</span>{" "}
          <a href="/" className="hover:underline">
            Wild Chicken University
          </a>
          . Assets have their own licenses.
        </span>
        <ul className="max-w-screen-lg flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-300 sm:mt-0">
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
          <li>
            <Button />
          </li>
        </ul>
      </div>
    </div>
  );
}
