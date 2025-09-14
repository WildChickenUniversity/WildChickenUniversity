"use client";
import React from "react";
import { z } from "zod";
import createDiplomaPDF from "@/lib/generateDiploma";
import DiplomaText from "./components/diplomaText.mdx";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";
import Bread from "@/lib/bread";
import DiplomaForm, { formSchema } from "./components/diplomaForm";

export default function Diploma() {
  const pathname = usePathname();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const majorField: string = values.enableCustomMajor
      ? values.customMajor!
      : values.major!;
    const degreeField: string = values.enableCustomDegree
      ? values.customDegree!
      : values.degree!;
    await createDiplomaPDF({
      username: values.username,
      major: majorField,
      degree: degreeField,
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col items-center justify-center mx-auto max-w-screen-lg w-full p-4">
        <div className="w-full max-w-2xl">
          <Bread pathname={pathname} />
          <h2 className="text-2xl font-bold my-1">
            Wild Chicken University Diploma
          </h2>
          <div className="mdx-layout font-sm mb-8">
            <DiplomaText />
          </div>
          <div className="border rounded-md p-6">
            <DiplomaForm onSubmit={onSubmit} />
          </div>
        </div>
      </main>
    </div>
  );
}
