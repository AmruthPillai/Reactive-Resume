import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { ArrowRight } from "@phosphor-icons/react";
import { twoFactorSchema } from "@reactive-resume/dto";
import { usePasswordToggle } from "@reactive-resume/hooks";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import type { z } from "zod";

import { useVerifyOtp } from "@/client/services/auth";

type FormValues = z.infer<typeof twoFactorSchema>;

export const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const { verifyOtp, loading } = useVerifyOtp();

  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await verifyOtp(data);

      void navigate("/dashboard");
    } catch {
      form.reset();
    }
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>
          {t`Two-Factor Authentication`} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">{t`Two-Factor Authentication`}</h2>
        <h6>
          <span className="leading-relaxed opacity-60">
            {t`Enter the one-time password provided by your authenticator app below.`}
          </span>
          <Button asChild variant="link" className="px-1.5">
            <Link to="/auth/backup-otp">
              {t`Lost your device?`} <ArrowRight className="ml-1" />
            </Link>
          </Button>
        </h6>
      </div>

      <div>
        <Form {...form}>
          <form
            ref={formRef}
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`One-Time Password`}</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" autoComplete="one-time-code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading} className="mt-4 w-full">
              {t`Sign in`}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
