"use client";
import React, { useState } from "react";
import createAdmissionPDF from "../components/generate-admission";
import NavPath from "../components/nav-path";
import BS from "./bs.mdx";

export default function Admission() {
  const [username, setUsername] = useState("");
  const [admitted, setAdmitted] = useState(false);
  const [graduate, setGraduate] = useState(false);

  const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createAdmissionPDF({ username, admitted, graduate });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <NavPath path="admission" />
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Wild Chicken Admission Portal
        </h2>
        <form onSubmit={handleSumbit} className="bg-white ">
          <div className="mb-8 font-sm text-gray-500 dark:text-gray-400 ">
            <BS />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Full Name
            </label>
            <input
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              name="username"
              type="text"
              placeholder="Enter your name here to get your offer!"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="md:flex mb-6">
            <label className="md:w-2/3 block text-gray-500 font-sm">
              <input
                className="mr-2 leading-tight"
                name="admitted"
                type="checkbox"
                onChange={(e) => setAdmitted(e.target.checked)}
              />
              <span className="text-sm">Admitted</span>
            </label>
            <label className="md:w-2/3 block text-gray-500 font-sm">
              <input
                className="mr-2 leading-tight"
                name="graduate"
                type="checkbox"
                onChange={(e) => setGraduate(e.target.checked)}
              />
              <span className="text-sm">Graduate</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="submit"
            >
              Get Admission Letter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
