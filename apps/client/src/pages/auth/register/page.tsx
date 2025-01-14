import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from "@lingui/macro";
import { ArrowRight } from "@phosphor-icons/react";
import { registerSchema } from "@reactive-resume/dto";
import { usePasswordToggle } from "@reactive-resume/hooks";
import {
  Alert,
  AlertTitle,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import type { z } from "zod";

import { useRegister } from "@/client/services/auth";
import { useFeatureFlags } from "@/client/services/feature";

type FormValues = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { flags } = useFeatureFlags();
  const { register, loading } = useRegister();

  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      locale: "en-US",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await register(data);

      void navigate("/auth/verify-email");
    } catch {
      form.reset();
    }
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>
          {t`Create a new account`} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">{t`Create a new account`}</h2>
        <h6>
          <span className="opacity-75">{t`Already have an account?`}</span>
          <Button asChild variant="link" className="px-1.5">
            <Link to="/auth/login">
              {t`Sign in now`} <ArrowRight className="ml-1" />
            </Link>
          </Button>
        </h6>
      </div>

      {flags.isSignupsDisabled && (
        <Alert variant="error">
          <AlertTitle>{t`Signups are currently disabled by the administrator.`}</AlertTitle>
        </Alert>
      )}

      <div className={cn(flags.isSignupsDisabled && "pointer-events-none select-none blur-sm")}>
        <Form {...form}>
          <form
            ref={formRef}
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Name`}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t({
                        message: "John Doe",
                        context:
                          "Localized version of a placeholder name. For example, Max Mustermann in German or Jan Kowalski in Polish.",
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Username`}</FormLabel>
                  <FormControl>
                    <Input
                      className="lowercase"
                      placeholder={t({
                        message: "john.doe",
                        context:
                          "Localized version of a placeholder username. For example, max.mustermann in German or jan.kowalski in Polish.",
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Email`}</FormLabel>
                  <FormControl>
                    <Input
                      className="lowercase"
                      placeholder={t({
                        message: "john.doe@example.com",
                        context:
                          "Localized version of a placeholder email. For example, max.mustermann@example.de in German or jan.kowalski@example.pl in Polish.",
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Password`}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    <Trans>
                      Hold <code className="text-xs font-bold">Ctrl</code> to display your password
                      temporarily.
                    </Trans>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} className="mt-4 w-full">
              {t`Sign up`}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
