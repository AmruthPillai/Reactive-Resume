import { zodResolver } from "@hookform/resolvers/zod";
import { Warning } from "@phosphor-icons/react";
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
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/client/hooks/use-toast";
import { useForgotPassword } from "@/client/services/auth";

type FormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { forgotPassword, loading } = useForgotPassword();

  const form = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await forgotPassword(data);
      setSubmitted(true);
      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;

        toast({
          variant: "error",
          icon: <Warning size={16} weight="bold" />,
          title: "An error occurred while trying to send your password recovery email",
          description: message,
        });
      }
    }
  };

  if (submitted) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">You've got mail!</h2>
          <Alert variant="success">
            <AlertDescription className="pt-0">
              A password reset link should have been sent to your inbox, if an account existed with
              the email you provided.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">Forgot your password?</h2>
        <h6 className="leading-relaxed opacity-75">
          Enter your email address and we will send you a link to reset your password if the account
          exists.
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading} className="mt-4 w-full">
              Send Email
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
