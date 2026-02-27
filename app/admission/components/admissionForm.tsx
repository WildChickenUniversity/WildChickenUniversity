"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Alumni from "@/app/components/alumniNotice";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import createAdmissionPDF from "@/app/admission/components/admissionLetterGenerator";

export const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  admitted: z.boolean(),
  graduate: z.boolean(),
});

interface AdmissionFormProps {
  onSubmit?: SubmitHandler<z.infer<typeof formSchema>>;
}

const AdmissionForm: React.FC<AdmissionFormProps> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      admitted: false,
      graduate: false,
    },
  });

  return (
    <Form {...form}>
      <Alumni />
      <form
        onSubmit={form.handleSubmit(
          onSubmit ?? (async (values) => await createAdmissionPDF(values)),
        )}
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
  );
};

export default AdmissionForm;
