"use client";

import { AlertCircleIcon, CircleDollarSign } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import createOfferPDF from "./offerLetterGenerator";
import OfferForm, { formSchema } from "./offerForm";
import { SendOffer } from "./offerSend";
import { Button } from "@/components/ui/button";

type OfferData = {
  username: string;
  jobTitle: string;
  startDate: string;
};

export default function OfferWrapper() {
  const [OfferData, setOfferData] = useState<OfferData | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      username: values.username,
      jobTitle: values.jobTitle,
      startDate: values.startDate,
    };
    await createOfferPDF(data);
    setOfferData(data);
  }

  return (
    <>
      {OfferData && (
        <div className="mb-4 border rounded-md p-6">
          <Alert variant="destructive" className="mb-4">
            <AlertCircleIcon />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              <p>
                Information will be send to Cloudflare for email processing, see{" "}
                <b>
                  <Link href="/pages/privacy#61-diplomaOffer-letter-email-sending">
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
              Your Offer letter has been generated!
            </p>
            <SendOffer
              username={OfferData.username}
              jobTitle={OfferData.jobTitle}
              startDate={OfferData.startDate}
            />{" "}
            <Button
              onClick={() => {
                setOfferData(null);
              }}
              variant="secondary"
            >
              Get Another Letter
            </Button>
          </div>
        </div>
      )}
      {!OfferData && (
        <div className="border rounded-md p-6">
          <OfferForm onSubmit={onSubmit} />
        </div>
      )}
    </>
  );
}
