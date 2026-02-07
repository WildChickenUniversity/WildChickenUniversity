"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type FormEvent, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Turnstile, { TurnstileRef } from "@/components/turnsile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }),
});

type SendAdmissionProps = {
  username: string;
  admitted: boolean;
  graduate: boolean;
};

export function SendAdmission({
  username,
  admitted,
  graduate,
}: SendAdmissionProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileRef>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("https://wcu.edu.pl/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "admission",
          email: values.email,
          username,
          admitted,
          graduate,
          token,
        }),
      });

      if (response.ok) {
        setResult("Email sent successfully!");
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      } else {
        setResult("Failed to send email. Please try again.");
        turnstileRef.current?.reset();
        setToken(null);
      }
    } catch (error) {
      setResult("An error occurred while sending the email.");
      console.log(error);
      turnstileRef.current?.reset();
      setToken(null);
    }
    setLoading(false);
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = await form.trigger("email");
    if (!isValid) return;
    await onSubmit(form.getValues());
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Send a Copy via Email</Button>
      </DialogTrigger>
      <DialogContent className="w-sm">
        <DialogHeader>
          <DialogTitle>Send Admission Letter via Email</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="recipient@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={loading || !token}
              >
                {loading ? "Sending..." : "Send"}
              </Button>
            </DialogFooter>
            <p className="font-mono text-xs text-center">
              reminder: check your spam box
            </p>
            {result && <p className="text-sm text-center mt-1">{result}</p>}
          </form>
        </Form>
        <Turnstile ref={turnstileRef} onToken={setToken} />
      </DialogContent>
    </Dialog>
  );
}
