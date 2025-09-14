"use client";
import React from "react";
import { z } from "zod";
import createAdmissionPDF from "@/lib/generateAdmission";
import AdmissionText from "./components/admissionText.mdx";
import Navbar from "@/components/navbar";
import Bread from "@/lib/bread";
import { usePathname } from "next/navigation";
import AdmissionForm, { formSchema } from "./components/admissionForm";
import NoticeText from "./components/noticeText.mdx";

export default function Admission() {
  const pathname = usePathname();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createAdmissionPDF(values);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col items-center justify-center mx-auto max-w-screen-lg w-full p-4">
        <div className="w-full max-w-2xl">
          <Bread pathname={pathname} />
          <h2 className="text-2xl font-bold my-1">
            Wild Chicken University Admission Portal
          </h2>
          <div className="mdx-layout font-sm mb-8">
            <AdmissionText />
          </div>
          <div className="border rounded-md p-6">
            <AdmissionForm onSubmit={onSubmit} />
          </div>
          <div className="mdx-layout font-sm mt-8">
            <NoticeText />
          </div>
        </div>
      </main>
    </div>
  );
}
