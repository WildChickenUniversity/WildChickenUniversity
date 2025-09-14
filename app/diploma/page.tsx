"use client";
import React, { useState } from "react";
import { z } from "zod";
import createDiplomaPDF from "@/lib/generateDiploma";
import DiplomaText from "./components/diplomaText.mdx";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";
import Bread from "@/lib/bread";
import DiplomaForm, { formSchema } from "./components/diplomaForm";
import { SendDiploma } from "./components/sendDiploma";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CircleDollarSign } from "lucide-react";
import Link from "next/link";

type DiplomaData = {
  username: string;
  major: string;
  degree: string;
};

export default function Diploma() {
  const pathname = usePathname();
  const [diplomaData, setDiplomaData] = useState<DiplomaData | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const majorField: string = values.enableCustomMajor
      ? values.customMajor!
      : values.major!;
    const degreeField: string = values.enableCustomDegree
      ? values.customDegree!
      : values.degree!;
    const data = {
      username: values.username,
      major: majorField,
      degree: degreeField,
    };
    await createDiplomaPDF(data);
    setDiplomaData(data);
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
          {diplomaData && (
            <div className="mt-4 border rounded-md p-6">
              <Alert variant="destructive" className="mb-4">
                <AlertCircleIcon />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  <p>
                    Information will be send to Cloudflare for email processing,
                    see{" "}
                    <b>
                      <Link href="/pages/privacy">Privacy Policy</Link>
                    </b>
                  </p>
                </AlertDescription>
              </Alert>
              <Alert className="mb-4">
                <CircleDollarSign />
                <AlertTitle>Best Time Ever</AlertTitle>
                <AlertDescription>
                  <p>
                    Like many universities, we do not have enough funding (pun
                    maybe intended). We are{" "}
                    <u>
                      <Link href="https://resend.com/docs/knowledge-base/resend-sending-limits#free-account-daily-and-monthly-sending-limits">
                        limited
                      </Link>
                    </u>{" "}
                    to send 3000 emails per month and 100 emails per day.
                  </p>
                </AlertDescription>
              </Alert>
              <div className="text-center ">
                <p className="mb-4 font-semibold">
                  Your diploma has been generated and downloaded!
                </p>
                <SendDiploma
                  username={diplomaData.username}
                  major={diplomaData.major}
                  degree={diplomaData.degree}
                />{" "}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
