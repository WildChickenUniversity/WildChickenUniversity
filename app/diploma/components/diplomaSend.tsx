"use client";

import { useForm } from "@tanstack/react-form";
import { type SyntheticEvent, useState, useRef } from "react";
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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }),
});

type SendDiplomaProps = {
  username: string;
  major: string;
  degree: string;
};

export function SendDiploma({ username, major, degree }: SendDiplomaProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileRef>(null);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      setResult(null);
      try {
        const response = await fetch("https://wcu.edu.pl/api/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "diploma",
            email: value.email,
            username,
            major,
            degree,
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
    },
  });

  const handleFormSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    await form.handleSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Send a Copy via Email</Button>
      </DialogTrigger>
      <DialogContent className="w-sm">
        <DialogHeader>
          <DialogTitle>Send Diploma via Email</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <form.Field name="email">
            {(field) => (
              <Field
                data-invalid={field.state.meta.errors.length > 0 || undefined}
              >
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="recipient@example.com"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

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
        <Turnstile ref={turnstileRef} onToken={setToken} />
      </DialogContent>
    </Dialog>
  );
}
