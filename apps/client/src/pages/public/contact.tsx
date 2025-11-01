import { t } from "@lingui/macro";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { ArrowLeft, EnvelopeSimple, PaperPlaneRight } from "@phosphor-icons/react";
import { Button, Input, Label } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "@/client/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactUsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
      reset();
      toast({
        variant: "success",
        title: t`Message sent successfully!`,
        description: t`We'll get back to you within 1-2 business days.`,
      });
    } catch (error) {
      toast({
        variant: "error",
        title: t`Failed to send message`,
        description: t`Please try again or email us directly at support@nasonga.com`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {t`Contact Us`} - {t`CV Builder`}
        </title>
      </Helmet>

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <ArrowLeft size={18} />
              {t`Back to Home`}
            </Link>
          </Button>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              {t`Contact Us`}
            </h1>
            <p className="text-muted-foreground">
              {t`We're here to help with payments, billing, account, or product questions.`}
            </p>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg border p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <EnvelopeSimple size={24} className="text-info" />
              <div>
                <h2 className="text-xl font-semibold">{t`Send us a message`}</h2>
                <p className="text-sm text-muted-foreground">
                  {t`We reply within 1–2 business days`}
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="bg-success/10 border border-success rounded-lg p-4 mb-4">
                <p className="text-success font-medium">
                  {t`Thank you for contacting us! We'll respond to your message soon.`}
                </p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">{t`Your Name`}</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder={t`John Doe`}
                  className="mt-1.5"
                />
                {errors.name && (
                  <p className="text-sm text-error mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">{t`Email Address`}</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  className="mt-1.5"
                />
                {errors.email && (
                  <p className="text-sm text-error mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subject">{t`Subject`}</Label>
                <Input
                  id="subject"
                  {...register("subject")}
                  placeholder={t`Brief description of your inquiry`}
                  className="mt-1.5"
                />
                {errors.subject && (
                  <p className="text-sm text-error mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message">{t`Message`}</Label>
                <textarea
                  id="message"
                  {...register("message")}
                  placeholder={t`Please provide details about your inquiry. For payment issues, include your Paystack reference (starts with REF...).`}
                  rows={6}
                  className={cn(
                    "mt-1.5 flex w-full rounded border border-border bg-transparent px-3 py-2 text-sm ring-0 ring-offset-transparent transition-colors placeholder:opacity-80 hover:bg-secondary/20 focus:border-primary focus:bg-secondary/20 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
                    errors.message ? "border-error" : "border-border"
                  )}
                />
                {errors.message && (
                  <p className="text-sm text-error mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? (
                  <>{t`Sending...`}</>
                ) : (
                  <>
                    <PaperPlaneRight size={18} className="mr-2" />
                    {t`Send Message`}
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
