import { t } from "@lingui/macro";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@reactive-resume/ui";

import { useDialog } from "@/client/stores/dialog";

export const PremiumDialog = () => {
  const { isOpen, mode, payload, close } = useDialog<null>("premium");

  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t`Upgrade to Pro`}</AlertDialogTitle>
          <AlertDialogDescription>
            {t`Unlock more features with a premium subscription.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{t`Cancel`}</AlertDialogCancel>
          <AlertDialogAction disabled={false} onClick={console.log}>
            {t`Upgrade`} {" 🚀"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
