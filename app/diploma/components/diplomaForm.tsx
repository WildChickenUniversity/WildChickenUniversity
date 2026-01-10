"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Alumni from "@/app/components/alumniNotice";
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
      message: "Username must be at least 1 character.",
    }),
    enableCustomMajor: z.boolean().default(false),
    major: z.string().optional(),
    customMajor: z.string().optional(),
    enableCustomDegree: z.boolean().default(false),
    degree: z.string().optional(),
    customDegree: z.string().optional(),
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
  onSubmit: SubmitHandler<z.infer<typeof formSchema>>;
}

const DiplomaForm: React.FC<DiplomaFormProps> = ({ onSubmit }) => {
  const { majors, degrees } = diplomaData;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      enableCustomMajor: false,
      major: "",
      customMajor: "",
      enableCustomDegree: false,
      degree: "Bachelor of Chicken",
      customDegree: "",
    },
  });

  const watchEnableCustomMajor = form.watch("enableCustomMajor");
  const watchEnableCustomDegree = form.watch("enableCustomDegree");

  return (
    <Form {...form}>
      <Alumni />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name to get your diploma!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="enableCustomMajor"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-sm">Custom Major</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="enableCustomDegree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-sm">Custom Degree</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {watchEnableCustomMajor ? (
          <FormField
            control={form.control}
            name="customMajor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Major</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your major"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Major</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a major" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {majors.map((majorOption, index) => (
                      <SelectItem key={index} value={majorOption}>
                        {majorOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {watchEnableCustomDegree ? (
          <FormField
            control={form.control}
            name="customDegree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Degree</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your degree"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a degree" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {degrees.map((degreeOption, index) => (
                      <SelectItem key={index} value={degreeOption}>
                        {degreeOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
    </Form>
  );
};

export default DiplomaForm;
