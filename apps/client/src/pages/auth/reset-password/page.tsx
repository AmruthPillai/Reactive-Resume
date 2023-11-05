import { zodResolver } from "@hookform/resolvers/zod";
import { Warning } from "@phosphor-icons/react";
import { resetPasswordSchema } from "@reactive-resume/dto";
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
import { AxiosError } from "axios";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

import { toast } from "@/client/hooks/use-toast";
import { useResetPassword } from "@/client/services/auth";

type FormValues = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const { resetPassword, loading } = useResetPassword();

  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await resetPassword(data);

      navigate("/auth/login");
    } catch (error) {
      form.reset();

      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;

        toast({
          variant: "error",
          icon: <Warning size={16} weight="bold" />,
          title: "An error occurred while trying to reset your password",
          description: message,
        });
      }
    }
  };

  // Redirect the user to the forgot password page if the token is not present.
  useEffect(() => {
    if (!token) navigate("/auth/forgot-password");
  }, [token, navigate]);

  return (
    <div className="space-y-8">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">Reset your password</h2>
        <h6 className="leading-relaxed opacity-75">
          Enter a new password below, and make sure it's secure.
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
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Hold <code className="text-xs font-bold">Ctrl</code> to display your password
                    temporarily.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading} className="mt-4 w-full">
              Update Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
