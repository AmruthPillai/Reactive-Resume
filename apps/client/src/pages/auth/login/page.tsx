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
import { Link } from "react-router-dom";
import { z } from "zod";

import { useAuth } from "@/client/hooks/use-auth";

// Define the schema locally as Supabase uses email
const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: t`Password must be at least 6 characters long` }),
});

type FormValues = z.infer<typeof loginFormSchema>;

export const LoginPage = () => {
  const { signIn, isLoading } = useAuth();

  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await signIn(data.email, data.password);
      // Navigate to dashboard or intended page on success (handled by SupabaseProvider)
    } catch (error) {
      // Handle error (e.g., show toast notification)
      console.error("Login failed:", error);
      form.reset(); // Optionally reset form on error
    }
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>
          {t`Sign in to your account`} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">{t`Sign in to your account`}</h2>
        <h6>
          <span className="opacity-75">{t`Don't have an account?`}</span>
          <Button asChild variant="link" className="px-1.5">
            <Link to="/auth/register">
              {t({ message: "Create one now", context: "This is a link to create a new account" })}{" "}
              <ArrowRight className="ml-1" />
            </Link>
          </Button>
        </h6>
      </div>

      {/* Removed email auth disabled check - handled by Supabase settings */}
      <div>
        <Form {...form}>
          <form
            ref={formRef}
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Email`}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      className="lowercase"
                      placeholder="john.doe@example.com"
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
                    <Input type="password" autoComplete="current-password" {...field} />
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

            <div className="mt-4 flex items-center gap-x-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {t`Sign in`}
              </Button>

              <Button asChild variant="link" className="px-4">
                {/* Link to Supabase password recovery if needed */}
                <Link to="/auth/forgot-password">{t`Forgot Password?`}</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
