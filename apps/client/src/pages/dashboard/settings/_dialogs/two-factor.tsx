import { zodResolver } from "@hookform/resolvers/zod";
import { i18n } from "@lingui/core";
import { msg, t } from "@lingui/macro";
import { QrCode } from "@phosphor-icons/react";
import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/client/hooks/use-toast";
import { queryClient } from "@/client/libs/query-client";
import { useDisable2FA, useEnable2FA, useSetup2FA } from "@/client/services/auth";
import { useDialog } from "@/client/stores/dialog";

// We're using the pre-existing "mode" state to determine the stage of 2FA set up the user is in.
// - "create" mode is used to enable 2FA.
// - "update" mode is used to verify 2FA, displaying a QR Code, once enabled.
// - "duplicate" mode is used to display the backup codes after initial verification.
// - "delete" mode is used to disable 2FA.

const formSchema = z.object({
  uri: z.literal("").or(z.string().optional()),
  code: z
    .literal("")
    .or(z.string().regex(/^\d{6}$/, i18n._(msg`Code must be exactly 6 digits long.`))),
  backupCodes: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

export const TwoFactorDialog = () => {
  const { toast } = useToast();
  const { isOpen, mode, open, close } = useDialog("two-factor");

  const isCreate = mode === "create";
  const isUpdate = mode === "update";
  const isDelete = mode === "delete";
  const isDuplicate = mode === "duplicate";

  const { setup2FA, loading: setupLoading } = useSetup2FA();
  const { enable2FA, loading: enableLoading } = useEnable2FA();
  const { disable2FA, loading: disableLoading } = useDisable2FA();

  const loading = setupLoading || enableLoading || disableLoading;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { uri: "", code: "", backupCodes: [] },
  });

  // If the user is enabling 2FA, we need to get the QR code URI from the server.
  // And display the QR code to the user.
  useEffect(() => {
    const initialize = async () => {
      const data = await setup2FA();
      form.setValue("uri", data.message);
    };

    if (isCreate) void initialize();
  }, [isCreate]);

  const onSubmit = async (values: FormValues) => {
    if (isCreate) {
      open("update");
    }

    if (isUpdate) {
      if (!values.code) return;

      const data = await enable2FA({ code: values.code });
      form.setValue("backupCodes", data.backupCodes);
      await queryClient.invalidateQueries({ queryKey: ["user"] });

      open("duplicate");
    }

    if (isDuplicate) {
      close();
    }

    if (isDelete) {
      const data = await disable2FA();
      toast({ variant: "success", title: data.message });
      await queryClient.invalidateQueries({ queryKey: ["user"] });

      close();
    }
  };

  if (isDelete) {
    return (
      <AlertDialog open={isOpen} onOpenChange={close}>
        <AlertDialogContent>
          <Form {...form}>
            <form className="space-y-4">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t`Are you sure you want to disable two-factor authentication?`}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t`If you disable two-factor authentication, you will no longer be required to enter a verification code when logging in.`}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <Alert variant="info">
                <AlertDescription>{t`Note: This will make your account less secure.`}</AlertDescription>
              </Alert>

              <AlertDialogFooter>
                <AlertDialogCancel>{t`Cancel`}</AlertDialogCancel>
                <AlertDialogAction variant="error" onClick={form.handleSubmit(onSubmit)}>
                  {t`Disable`}
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="!max-w-md">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center space-x-2.5">
                  <QrCode />
                  <h2>
                    {mode === "create" && t`Setup two-factor authentication on your account`}
                    {mode === "update" &&
                      t`Verify that two-factor authentication has been setup correctly`}
                    {mode === "duplicate" && t`Store your backup codes securely`}
                  </h2>
                </div>
              </DialogTitle>
              <DialogDescription>
                {isCreate &&
                  t`Scan the QR code below with your authenticator app to setup 2FA on your account.`}
                {isUpdate &&
                  t`Enter the 6-digit code from your authenticator app to verify that 2FA has been setup correctly.`}
                {isDuplicate && t`You have enabled two-factor authentication successfully.`}
              </DialogDescription>
            </DialogHeader>

            {isCreate && (
              <FormField
                name="uri"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
                        <QRCodeSVG value={field.value ?? ""} size={256} className="mx-auto" />
                        <Input readOnly {...field} className="opacity-75" />
                      </div>
                    </FormControl>
                    <FormDescription>
                      {t`In case you are unable to scan this QR Code, you can also copy-paste this link into your authenticator app.`}
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}

            {isUpdate && (
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t`Code`}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {isDuplicate && (
              <>
                <FormField
                  name="backupCodes"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="mx-auto grid max-w-xs grid-cols-2 rounded-sm bg-secondary/50 p-4 text-center font-mono leading-loose">
                        {field.value.map((code) => (
                          <p key={code}>{code}</p>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />

                <p className="text-xs leading-relaxed">
                  {t`Please store your backup codes in a secure location. You can use one of these one-time use codes to login in case you lose access to your authenticator app.`}
                </p>
              </>
            )}

            <DialogFooter>
              {isCreate && <Button disabled={loading}>{t`Continue`}</Button>}
              {isUpdate && (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      open("create");
                    }}
                  >
                    {t`Back`}
                  </Button>

                  <Button disabled={loading}>{t`Continue`}</Button>
                </>
              )}
              {isDuplicate && <Button disabled={loading}>{t`Close`}</Button>}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
