"use client";
import React, { useState } from "react";
import createAdmissionPDF from "../components/generateAdmission";

export default function Admission() {
  const [username, setUsername] = useState("");
  const [admitted, setAdmitted] = useState(false);
  const [graduate, setGraduate] = useState(false);

  const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createAdmissionPDF({ username, admitted, graduate });
  };

  return (
    <div className="w-full mx-auto relative flex flex-col items-center justify-center h-screen">
      <h1>Wild Chicken University Admission Portal</h1>
      <form
        onSubmit={handleSumbit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="username"
            type="text"
            placeholder="John Oliver"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="md:flex mb-6">
          <label className="md:w-2/3 block text-gray-500 font-bold">
            <input
              className="mr-2 leading-tight"
              name="admitted"
              type="checkbox"
              onChange={(e) => setAdmitted(e.target.checked)}
            />
            <span className="text-sm">Admitted</span>
          </label>
          <label className="md:w-2/3 block text-gray-500 font-bold">
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Get Admission Letter
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        This form is client-side only. <br />
        <a href="">Disclaimer</a>
      </p>
    </div>
  );
}
