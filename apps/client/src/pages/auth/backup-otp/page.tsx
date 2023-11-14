import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

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

      navigate("/dashboard");
    } catch (error) {
      form.reset();
    }
  };

  return (
    <div className="space-y-8">
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
                      title={t`Backup Codes may contain only lowercase letters or numbers, and must be exactly 10 characters.`}
                      {...field}
                    />
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
