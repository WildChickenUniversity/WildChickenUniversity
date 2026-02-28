"use client";

import { AlertCircleIcon, CircleDollarSign } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import createDiplomaPDF from "./diplomaGenerator";
import DiplomaForm, { formSchema } from "./diplomaForm";
import { SendDiploma } from "./diplomaSend";
import { Button } from "@/components/ui/button";

type DiplomaData = {
  username: string;
  major: string;
  degree: string;
  withHonors: boolean;
};

export default function DiplomaWrapper() {
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
      withHonors: values.withHonors,
    };
    await createDiplomaPDF(data);
    setDiplomaData(data);
  }

  return (
    <>
      {diplomaData && (
        <div className="mb-4 border rounded-md p-6">
          <Alert variant="destructive" className="mb-4">
            <AlertCircleIcon />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              <p>
                Information will be send to Cloudflare for email processing, see{" "}
                <b>
                  <Link href="/pages/privacy#61-diplomaadmission-letter-email-sending">
                    Privacy Policy
                  </Link>
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
              Your diploma has been generated!
            </p>
            <SendDiploma
              username={diplomaData.username}
              major={diplomaData.major}
              degree={diplomaData.degree}
            />{" "}
            <Button
              onClick={() => {
                setDiplomaData(null);
              }}
              variant="secondary"
            >
              Get Another Diploma
            </Button>
          </div>
        </div>
      )}
      {!diplomaData && (
        <div className="border rounded-md p-6">
          <DiplomaForm onSubmit={onSubmit} />
        </div>
      )}
    </>
  );
}
