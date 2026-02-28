"use client";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { z } from "zod";
import Alumni from "@/app/components/alumniNotice";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import createAdmissionPDF from "@/app/admission/components/admissionLetterGenerator";

export const formSchema = z.object({
  username: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  }),
  admitted: z.boolean(),
  graduate: z.boolean(),
});

interface AdmissionFormProps {
  onSubmit?: (values: z.infer<typeof formSchema>) => void | Promise<void>;
}

const AdmissionForm: React.FC<AdmissionFormProps> = ({ onSubmit }) => {
  const form = useForm({
    defaultValues: {
      username: "",
      admitted: false,
      graduate: false,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (onSubmit) {
        await onSubmit(value);
        return;
      }
      await createAdmissionPDF(value);
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
          <form.Field name="admitted">
            {(field) => (
              <Field
                className="flex items-center justify-between rounded-xl border bg-white px-4 py-3"
                orientation="horizontal"
              >
                <div className="min-w-0">
                  <FieldLabel
                    className="text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Admitted
                  </FieldLabel>
                  <p className="text-xs text-muted-foreground">
                    Your future is yours to control.
                  </p>
                </div>

                <Switch
                  id={field.name}
                  name={field.name}
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="graduate">
            {(field) => (
              <Field
                className="flex items-center justify-between rounded-xl border bg-white px-4 py-3"
                orientation="horizontal"
              >
                <div className="min-w-0">
                  <FieldLabel
                    className="text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Graduate level
                  </FieldLabel>
                  <p className="text-xs text-muted-foreground">
                    Generate a graduate-level offer.
                  </p>
                </div>

                <Switch
                  id={field.name}
                  name={field.name}
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
              </Field>
            )}
          </form.Field>
        </div>

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
    </>
  );
};

export default AdmissionForm;
