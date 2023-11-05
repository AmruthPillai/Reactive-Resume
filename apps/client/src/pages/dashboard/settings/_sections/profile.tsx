import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@reactive-resume/hooks";
import { Button } from "@reactive-resume/ui";
import { Combobox } from "@reactive-resume/ui";
import { Form, FormDescription, FormField, FormItem, FormLabel } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUpdateUser, useUser } from "@/client/services/user";

const formSchema = z.object({
  theme: z.enum(["system", "light", "dark"]).default("system"),
  language: z.string().default("en"),
});

type FormValues = z.infer<typeof formSchema>;

export const ProfileSettings = () => {
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const { updateUser, loading } = useUpdateUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { theme, language: "en" },
  });

  useEffect(() => {
    user && onReset();
  }, [user]);

  const onReset = () => {
    if (!user) return;

    form.reset({ theme, language: user.language ?? "en" });
  };

  const onSubmit = async (data: FormValues) => {
    if (!user) return;

    setTheme(data.theme);

    if (user.language !== data.language) {
      await updateUser({ language: data.language });
    }

    form.reset(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight">Profile</h3>
        <p className="leading-relaxed opacity-75">
          Here, you can update your profile to customize and personalize your experience.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 sm:grid-cols-2">
          <FormField
            name="theme"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Theme</FormLabel>
                <div className="w-full">
                  <Combobox
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                    options={[
                      { label: "System", value: "system" },
                      { label: "Light", value: "light" },
                      { label: "Dark", value: "dark" },
                    ]}
                  />
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="language"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <div className="w-full">
                  <Combobox
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                    options={[
                      {
                        value: "en",
                        label: <p>English</p>,
                      },
                    ]}
                  />
                </div>
                <FormDescription>
                  <span>
                    Don't see your language?{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      href="https://translate.rxresu.me/"
                      className="font-medium underline underline-offset-2"
                    >
                      Help translate the app.
                    </a>
                  </span>
                </FormDescription>
              </FormItem>
            )}
          />

          <div
            className={cn(
              "hidden items-center space-x-2 self-center sm:col-start-2",
              form.formState.isDirty && "flex animate-in fade-in",
            )}
          >
            <Button type="submit" disabled={loading}>
              Save Changes
            </Button>
            <Button type="reset" variant="ghost" onClick={onReset}>
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
