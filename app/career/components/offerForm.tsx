"use client";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { z } from "zod";
import Alumni from "@/app/components/alumniNotice";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import createOfferPDF from "./offerLetterGenerator";

export const formSchema = z.object({
  username: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  }),
  jobTitle: z.string().min(1, {
    message: "Job title must be at least 1 character.",
  }),
  startDate: z.string().min(1, {
    message: "Please pick a start date.",
  }),
});

interface OfferFormProps {
  onSubmit?: (values: z.infer<typeof formSchema>) => void | Promise<void>;
}

const OfferForm: React.FC<OfferFormProps> = ({ onSubmit }) => {
  const form = useForm({
    defaultValues: {
      username: "",
      jobTitle: "",
      startDate: "1970-01-01",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (onSubmit) {
        await onSubmit(value);
        return;
      }
      await createOfferPDF(value);
    },
  });

  return (
    <>
      <Alumni />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
        className="space-y-5"
      >
        <form.Field name="username">
          {(field) => (
            <Field
              data-invalid={field.state.meta.errors.length > 0 || undefined}
            >
              <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Enter your name here to get your offer!"
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>

        <div className="grid gap-4 md:grid-cols-2">
          <form.Field name="jobTitle">
            {(field) => (
              <Field
                data-invalid={field.state.meta.errors.length > 0 || undefined}
              >
                <FieldLabel htmlFor={field.name}>Job Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Chief Chicken Officer"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="startDate">
            {(field) => (
              <Field
                data-invalid={field.state.meta.errors.length > 0 || undefined}
              >
                <FieldLabel htmlFor={field.name}>Start Date</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="date"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>
        </div>

        <div>
          <Button className="w-full" type="submit">
            Get Offer Letter
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
    </>
  );
};

export default OfferForm;
