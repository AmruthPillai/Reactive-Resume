import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { ArrowLeft } from "@phosphor-icons/react";
import { forgotPasswordSchema } from "@reactive-resume/dto";
import {
  Alert,
  AlertDescription,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type { z } from "zod";

import { useForgotPassword } from "@/client/services/auth";

type FormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { forgotPassword, loading } = useForgotPassword();

  const form = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormValues) => {
    await forgotPassword(data);

    setSubmitted(true);
    form.reset();
  };

  if (submitted) {
    return (
      <div className="space-y-8">
        <Helmet>
          <title>
            {t`You've got mail!`} - {t`Reactive Resume`}
          </title>
        </Helmet>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">{t`You've got mail!`}</h2>
          <Alert variant="success">
            <AlertDescription className="pt-0">
              {t`A password reset link should have been sent to your inbox, if an account existed with the email you provided.`}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">{t`Forgot your password?`}</h2>
        <h6 className="leading-relaxed opacity-75">
          {t`Enter your email address and we will send you a link to reset your password if the account exists.`}
        </h6>
      </div>

      <div>
        <Form {...form}>
          <form className="flex flex-col gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Email`}</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 flex items-center gap-x-2">
              <Button
                variant="link"
                className="px-5"
                onClick={() => {
                  void navigate(-1);
                }}
              >
                <ArrowLeft size={14} className="mr-2" />
                <span>{t`Back`}</span>
              </Button>

              <Button type="submit" disabled={loading} className="w-full">
                {t`Send Email`}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
