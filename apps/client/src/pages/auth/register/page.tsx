import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from "@lingui/macro";
import { ArrowRight } from "@phosphor-icons/react";
import { usePasswordToggle } from "@reactive-resume/hooks";
import {
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
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { useAuth } from "@/client/hooks/use-auth";
import { useToast } from "@/client/hooks/use-toast";

// Define the schema locally for Supabase signup
const registerFormSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(3).regex(/^[a-z0-9_]+$/, { message: t`Username must be lowercase letters, numbers, or underscores.` }),
  email: z.string().email(),
  password: z.string().min(6, { message: t`Password must be at least 6 characters long` }),
  locale: z.string().default("en-US"), // Default locale
});

type FormValues = z.infer<typeof registerFormSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, isLoading } = useAuth();

  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(registerFormSchema),
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
      await signUp(data.email, data.password, {
        data: {
          name: data.name,
          username: data.username,
          locale: data.locale,
        },
      });

      // Show success message, Supabase handles email verification
      toast({
        title: t`Account Created`,
        description: t`Please check your email to verify your account.`,
      });

      // Navigate to a confirmation page or login
      navigate("/auth/login");
    } catch (error: any) {
      // Handle error (e.g., show toast notification)
      toast({
        variant: "error",
        title: t`Signup Failed`,
        description: error.message || t`An unexpected error occurred.`,
      });
      console.error("Signup failed:", error);
      // Optionally reset parts of the form, e.g., password
      form.reset({ ...data, password: "" });
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

      {/* Removed signup disabled check - handled by Supabase settings */}
      <div>
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
                    <Input type="password" autoComplete="new-password" {...field} />
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

            <Button disabled={isLoading} className="mt-4 w-full">
              {t`Sign up`}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
