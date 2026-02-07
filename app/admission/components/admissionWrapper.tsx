"use client";

import { AlertCircleIcon, CircleDollarSign } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import createAdmissionPDF from "./admissionLetterGenerator";
import AdmissionForm, { formSchema } from "./admissionForm";
import { SendAdmission } from "./admissionSend";

type AdmissionData = {
  username: string;
  admitted: boolean;
  graduate: boolean;
};

export default function AdmissionWrapper() {
  const [admissionData, setAdmissionData] = useState<AdmissionData | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      username: values.username,
      admitted: values.admitted,
      graduate: values.graduate,
    };
    await createAdmissionPDF(data);
    setAdmissionData(data);
  }

  return (
    <>
      <div className="border rounded-md p-6">
        <AdmissionForm onSubmit={onSubmit} />
      </div>
      {admissionData && (
        <div className="mt-4 border rounded-md p-6">
          <Alert variant="destructive" className="mb-4">
            <AlertCircleIcon />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              <p>
                Information will be send to Cloudflare for email processing, see{" "}
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
                Like many universities, we do not have enough funding (pun maybe
                intended). We are{" "}
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
              Your admission letter has been generated!
            </p>
            <SendAdmission
              username={admissionData.username}
              admitted={admissionData.admitted}
              graduate={admissionData.graduate}
            />{" "}
          </div>
        </div>
      )}
    </>
  );
}
