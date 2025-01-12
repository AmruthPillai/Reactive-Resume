import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from "@lingui/macro";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from "@reactive-resume/ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCounter } from "usehooks-ts";
import { z } from "zod";

import { useToast } from "@/client/hooks/use-toast";
import { useLogout } from "@/client/services/auth";
import { useDeleteUser } from "@/client/services/user";

const formSchema = z.object({
  deleteConfirm: z.literal("delete"),
});

type FormValues = z.infer<typeof formSchema>;

export const DangerZoneSettings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { count, increment } = useCounter(0);
  const { deleteUser, loading } = useDeleteUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deleteConfirm: "" as FormValues["deleteConfirm"],
    },
  });

  const onDelete = async () => {
    // On the first click, increment the counter
    increment();

    // On the second click, delete the account
    if (count === 1) {
      await Promise.all([deleteUser(), logout()]);

      toast({
        variant: "success",
        title: t`Your account and all your data has been deleted successfully. Goodbye!`,
      });

      void navigate("/");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight">{t`Danger Zone`}</h3>
        <p className="leading-relaxed opacity-75">
          <Trans>
            In this section, you can delete your account and all the data associated to your user,
            but please keep in mind that{" "}
            <span className="font-semibold">this action is irreversible</span>.
          </Trans>
        </p>
      </div>

      <Form {...form}>
        <form className="grid gap-6 sm:grid-cols-2" onSubmit={form.handleSubmit(onDelete)}>
          <FormField
            name="deleteConfirm"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t`Delete Account`}</FormLabel>
                <FormControl>
                  <Input placeholder="delete" {...field} />
                </FormControl>
                <FormDescription>
                  <Trans>
                    Type <code className="font-bold">delete</code> to confirm deleting your account.
                  </Trans>
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2 self-center">
            <Button type="submit" variant="error" disabled={!form.formState.isValid || loading}>
              {count === 1 ? t`Are you sure?` : t`Delete Account`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
