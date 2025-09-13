"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import createAdmissionPDF from "@/lib/generateAdmission";
import AdmissionText from "./admissionText.mdx";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Bread from "@/lib/bread";
import { usePathname } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  admitted: z.boolean().default(false),
  graduate: z.boolean().default(false),
});

export default function Admission() {
  const pathname = usePathname();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      admitted: false,
      graduate: false,
    },
  });

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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name here to get your offer!"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="admitted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Admitted</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="graduate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Graduate</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <div>
                  <Button className="w-full" type="submit">
                    Get Admission Letter
                  </Button>
                  <p className="text-muted-foreground text-xs mt-2">
                    By submitting this form, you agree to the{" "}
                    <b>
                      <Link href="/pages/disclaimer">disclaimer</Link>
                    </b>
                    .
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}
