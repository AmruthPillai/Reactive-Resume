import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from "@lingui/macro";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from "@reactive-resume/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/client/hooks/use-toast";
import { useUpdatePassword } from "@/client/services/auth";
import { useUser } from "@/client/services/user";
import { useDialog } from "@/client/stores/dialog";

const formSchema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    // eslint-disable-next-line lingui/t-call-in-function
    message: t`The passwords you entered do not match.`,
  });

type FormValues = z.infer<typeof formSchema>;

export const SecuritySettings = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const { open } = useDialog("two-factor");
  const { updatePassword, loading } = useUpdatePassword();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onReset = () => {
    form.reset({ password: "", confirmPassword: "" });
  };

  const onSubmit = async (data: FormValues) => {
    await updatePassword({ password: data.password });

    toast({
      variant: "success",
      title: t`Your password has been updated successfully.`,
    });

    onReset();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight">{t`Security`}</h3>
        <p className="leading-relaxed opacity-75">
          {t`In this section, you can change your password and enable/disable two-factor authentication.`}
        </p>
      </div>

      <Accordion type="multiple" defaultValue={["password", "two-factor"]}>
        <AccordionItem value="password">
          <AccordionTrigger>{t`Password`}</AccordionTrigger>
          <AccordionContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 sm:grid-cols-2">
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t`New Password`}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>{t`Confirm New Password`}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      {fieldState.error && (
                        <FormDescription className="text-error-foreground">
                          {fieldState.error?.message}
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />

                <AnimatePresence presenceAffectsLayout>
                  {form.formState.isDirty && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex items-center space-x-2 self-center sm:col-start-2"
                    >
                      <Button type="submit" disabled={loading}>
                        {t`Change Password`}
                      </Button>
                      <Button type="reset" variant="ghost" onClick={onReset}>
                        {t`Discard`}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="two-factor">
          <AccordionTrigger>{t`Two-Factor Authentication`}</AccordionTrigger>
          <AccordionContent>
            {user?.twoFactorEnabled ? (
              <p className="mb-4 leading-relaxed opacity-75">
                <Trans>
                  <strong>Two-factor authentication is enabled.</strong> You will be asked to enter
                  a code every time you sign in.
                </Trans>
              </p>
            ) : (
              <p className="mb-4 leading-relaxed opacity-75">
                <Trans>
                  <strong>Two-factor authentication is currently disabled.</strong> You can enable
                  it by adding an authenticator app to your account.
                </Trans>
              </p>
            )}

            {user?.twoFactorEnabled ? (
              <Button variant="outline" onClick={() => open("delete")}>
                {t`Disable 2FA`}
              </Button>
            ) : (
              <Button variant="outline" onClick={() => open("create")}>
                {t`Enable 2FA`}
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
