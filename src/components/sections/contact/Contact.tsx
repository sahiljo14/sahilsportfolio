"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters for your name.")
    .max(100, "Your name must be 100 characters or fewer."),
  email: z.string().trim().email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Your message must be at least 10 characters.")
    .max(1000, "Your message must be 1,000 characters or fewer."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const validateField = (field: keyof ContactFormValues) => (value: string) => {
  const result = contactFormSchema.shape[field].safeParse(value);

  return result.success || result.error.issues[0]?.message || "Invalid value.";
};

export default function Contact() {
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    const result = contactFormSchema.safeParse(values);

    if (!result.success) {
      return;
    }

    setSubmittedName(result.data.name);
    reset();
  };

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Contact
            </p>
            <h2 className="mt-2 text-4xl font-bold">Let&apos;s Connect</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Have a project, opportunity, or idea in mind? Send a message and
              I&apos;ll get back to you.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
            </CardHeader>

            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="contact-name">
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    autoComplete="name"
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    aria-invalid={Boolean(errors.name)}
                    placeholder="Your name"
                    {...register("name", { validate: validateField("name") })}
                  />
                  {errors.name && (
                    <p id="contact-name-error" role="alert" className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="contact-email">
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    aria-invalid={Boolean(errors.email)}
                    placeholder="you@example.com"
                    {...register("email", { validate: validateField("email") })}
                  />
                  {errors.email && (
                    <p id="contact-email-error" role="alert" className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="contact-message">
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    aria-invalid={Boolean(errors.message)}
                    placeholder="Tell me a little about your idea or project."
                    {...register("message", { validate: validateField("message") })}
                  />
                  {errors.message && (
                    <p id="contact-message-error" role="alert" className="text-sm text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting}>
                  Send message
                </Button>

                {submittedName && (
                  <p role="status" className="text-sm leading-6 text-muted-foreground">
                    Thanks, {submittedName}. Your message passed local validation;
                    message delivery will be connected in a future update.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
