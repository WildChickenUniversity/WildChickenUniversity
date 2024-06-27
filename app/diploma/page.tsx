"use client";
import React, { useEffect, useState } from "react";
import createDiplomaPDF from "../components/generate-diploma";
import NavPath from "../components/nav-path";

export default function Diploma() {
  const [username, setUsername] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("Bachelor of Chicken");
  const [customMajor, setCustomMajor] = useState("");
  const [enableCustomMajor, setEnableCustomMajor] = useState(false);
  const [customDegree, setCustomDegree] = useState("");
  const [enableCustomDegree, setEnableCustomDegree] = useState(false);
  const [majors, setMajors] = useState<string[]>([]);

  useEffect(() => {
    fetch("/majors.json")
      .then((response) => response.json())
      .then((data) => setMajors(data))
      .catch((error) => console.error("Error fetching majors:", error));
  }, []);

  const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const majorField: string =
      enableCustomMajor && customMajor !== "" ? customMajor : major;
    const degreeField: string =
      enableCustomDegree && customDegree !== "" ? customDegree : degree;
    await createDiplomaPDF({
      username,
      major: majorField,
      degree: degreeField,
    });
  };

  const handleSelectChangeMajor = async (value: string) => {
    setMajor(value);
    // Show the input field if the user selects "other"
    setEnableCustomMajor(value === "other");
  };

  const handleSelectChangeDegree = async (value: string) => {
    setDegree(value);
    // Show the input field if the user selects "other"
    setEnableCustomDegree(value === "other");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-950">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <NavPath path="certificate" />
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Too old for universities?
        </h2>
        <form onSubmit={handleSumbit} className="bg-white dark:bg-gray-950">
          <div className="mb-8 font-sm text-gray-500 dark:text-gray-300 ">
            <p>
              Our diploma is recognized by members of the{" "}
              <a
                href="https://github.com/U4Group"
                className="underline-animation"
              >
                U4 Group of GitHub Research Universities
              </a>
              ; and probably all the McDonald&apos;s with a working ice cream
              machine.
            </p>
            <br />
            <p>
              A diploma is a document awarded by an educational institution
              (such as a college or university) testifying the recipient has
              graduated by successfully completing their courses of studies.
              Historically, it has also referred to a charter or official
              document of diplomacy.
              <sup>
                {" "}
                <a href="https://en.wikipedia.org/wiki/Diploma">src</a>
              </sup>
            </p>
          </div>
          <div className="mb-4 ">
            <label className="block mb-2  text-sm font-medium text-gray-900 dark:text-gray-300">
              Full Name
            </label>
            <input
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-5/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              name="username"
              type="text"
              placeholder="Enter your name here to get your offer!"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex mb-4 items-center">
            <div className="flex-grow">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Major
              </label>
              <select
                className="mb-2 relative inline-block w-5/12 appearance-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                name="major"
                value={major}
                onChange={(e) => {
                  handleSelectChangeMajor(e.target.value);
                  setMajor(e.target.value);
                }}
              >
                <option value=""></option>
                <option value="other">Other (Customized Major)</option>
                {majors.map((majorOption, index) => (
                  <option key={index} value={majorOption}>
                    {majorOption}
                  </option>
                ))}
              </select>
              {enableCustomMajor && (
                <input
                  className="relative ml-4 inline-block shadow-sm w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  name="customMajor"
                  value={customMajor}
                  placeholder="Enter your major"
                  onChange={(e) => setCustomMajor(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="flex mb-4 items-center">
            <div className="flex-grow">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Degree
              </label>
              <select
                className="mb-2 relative inline-block w-5/12 appearance-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                name="degree"
                value={degree}
                onChange={(e) => {
                  handleSelectChangeDegree(e.target.value);
                  setDegree(e.target.value);
                }}
              >
                <option value="Bachelor of Chicken">Bachelor of Chicken</option>
                <option value="Master of Chicken">Master of Chicken</option>
                <option value="Doctor of Philosophy">
                  Doctor of Philosophy
                </option>
                <option value="other">Other</option>
              </select>
              {enableCustomDegree && (
                <input
                  className="relative ml-4 inline-block shadow-sm w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  name="customDegree"
                  value={customDegree}
                  placeholder="Enter your degree"
                  onChange={(e) => setCustomDegree(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="submit"
            >
              Get My Diploma
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
