import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { ArrowLeft } from "@phosphor-icons/react";
import { twoFactorBackupSchema } from "@reactive-resume/dto";
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
import { useNavigate } from "react-router";
import type { z } from "zod";

import { useBackupOtp } from "@/client/services/auth";

type FormValues = z.infer<typeof twoFactorBackupSchema>;

export const BackupOtpPage = () => {
  const navigate = useNavigate();
  const { backupOtp, loading } = useBackupOtp();

  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(twoFactorBackupSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await backupOtp(data);

      void navigate("/dashboard");
    } catch {
      form.reset();
    }
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>
          {t`Use your backup code`} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">{t`Use your backup code`}</h2>
        <h6 className="leading-relaxed opacity-60">
          {t`Enter one of the 10 backup codes you saved when you enabled two-factor authentication.`}
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
                  <FormLabel>{t`Backup Code`}</FormLabel>
                  <FormControl>
                    <Input
                      pattern="[a-z0-9]{10}"
                      placeholder="a1b2c3d4e5"
                      autoComplete="one-time-code"
                      title={t`Backup Codes may contain only lowercase letters or numbers, and must be exactly 10 characters.`}
                      {...field}
                    />
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

              <Button type="submit" disabled={loading} className="flex-1">
                {t`Sign in`}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
