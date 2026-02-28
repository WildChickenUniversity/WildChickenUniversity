"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { z } from "zod";
import Alumni from "@/app/components/alumniNotice";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import diplomaData from "@/lib/diploma.json";

export const formSchema = z
  .object({
    username: z.string().min(1, {
      message: "Name must be at least 1 character.",
    }),
    enableCustomMajor: z.boolean(),
    major: z.string().optional(),
    customMajor: z.string().optional(),
    enableCustomDegree: z.boolean(),
    degree: z.string().optional(),
    customDegree: z.string().optional(),
    withHonors: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.enableCustomMajor) {
      if (!data.customMajor || data.customMajor.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please enter a custom major.",
          path: ["customMajor"],
        });
      }
    } else {
      if (!data.major || data.major.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please select a major.",
          path: ["major"],
        });
      }
    }
    if (data.enableCustomDegree) {
      if (!data.customDegree || data.customDegree.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please enter a custom degree.",
          path: ["customDegree"],
        });
      }
    } else {
      if (!data.degree || data.degree.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please select a degree.",
          path: ["degree"],
        });
      }
    }
  });

interface DiplomaFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void | Promise<void>;
}

const DiplomaForm: React.FC<DiplomaFormProps> = ({ onSubmit }) => {
  const { majors, degrees } = diplomaData;
  const defaultValues: z.input<typeof formSchema> = {
    username: "",
    enableCustomMajor: false,
    major: "",
    customMajor: "",
    enableCustomDegree: false,
    degree: "Bachelor of Chicken",
    customDegree: "",
    withHonors: false,
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
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
                placeholder="Enter your name to get your diploma!"
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>

        <div className="grid md:grid-cols-3 gap-2">
          <form.Field name="enableCustomMajor">
            {(field) => (
              <Field
                className="flex items-center justify-between rounded-xl border bg-white px-4 py-3"
                orientation="horizontal"
              >
                <div className="min-w-0">
                  <FieldLabel className="text-sm" htmlFor={field.name}>
                    Custom Major
                  </FieldLabel>
                  <p className="text-xs text-muted-foreground">
                    Define it below
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
          <form.Field name="enableCustomDegree">
            {(field) => (
              <Field
                className="flex items-center justify-between rounded-xl border bg-white px-4 py-3"
                orientation="horizontal"
              >
                <div className="min-w-0">
                  <FieldLabel className="text-sm" htmlFor={field.name}>
                    Custom Degree
                  </FieldLabel>
                  <p className="text-xs text-muted-foreground">
                    Define it below
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

          <form.Field name="withHonors">
            {(field) => (
              <Field
                className="flex items-center justify-between rounded-xl border bg-white px-4 py-3"
                orientation="horizontal"
              >
                <div className="min-w-0">
                  <FieldLabel className="text-sm" htmlFor={field.name}>
                    With Honors
                  </FieldLabel>
                  <p className="text-xs text-muted-foreground">GPA too high?</p>
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

        <form.Subscribe
          selector={(state) => ({
            watchEnableCustomMajor: state.values.enableCustomMajor,
            watchEnableCustomDegree: state.values.enableCustomDegree,
          })}
        >
          {({ watchEnableCustomMajor, watchEnableCustomDegree }) => (
            <>
              {watchEnableCustomMajor ? (
                <form.Field name="customMajor">
                  {(field) => (
                    <Field
                      data-invalid={
                        field.state.meta.errors.length > 0 || undefined
                      }
                    >
                      <FieldLabel htmlFor={field.name}>Custom Major</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="Enter your major"
                        className="w-full"
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>
              ) : (
                <form.Field name="major">
                  {(field) => (
                    <Field
                      data-invalid={
                        field.state.meta.errors.length > 0 || undefined
                      }
                    >
                      <FieldLabel htmlFor={field.name}>Major</FieldLabel>
                      <Select
                        value={field.state.value ?? ""}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger className="w-full" id={field.name}>
                          <SelectValue placeholder="Select a major" />
                        </SelectTrigger>
                        <SelectContent>
                          {majors.map((majorOption, index) => (
                            <SelectItem key={index} value={majorOption}>
                              {majorOption}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>
              )}

              {watchEnableCustomDegree ? (
                <form.Field name="customDegree">
                  {(field) => (
                    <Field
                      data-invalid={
                        field.state.meta.errors.length > 0 || undefined
                      }
                    >
                      <FieldLabel htmlFor={field.name}>
                        Custom Degree
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="Enter your degree"
                        className="w-full"
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>
              ) : (
                <form.Field name="degree">
                  {(field) => (
                    <Field
                      data-invalid={
                        field.state.meta.errors.length > 0 || undefined
                      }
                    >
                      <FieldLabel htmlFor={field.name}>Degree</FieldLabel>
                      <Select
                        value={field.state.value ?? ""}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger className="w-full" id={field.name}>
                          <SelectValue placeholder="Select a degree" />
                        </SelectTrigger>
                        <SelectContent>
                          {degrees.map((degreeOption, index) => (
                            <SelectItem key={index} value={degreeOption}>
                              {degreeOption}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>
              )}
            </>
          )}
        </form.Subscribe>

        <div>
          <Button className="w-full" type="submit">
            Get My Diploma
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

export default DiplomaForm;
