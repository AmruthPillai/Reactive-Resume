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
import { useNavigate } from "react-router-dom";

import { useDialog } from "@/client/stores/dialog";

export const PremiumDialog = () => {
  const { isOpen, mode, payload, close } = useDialog<null>("premium");
  const navigate = useNavigate();

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
          {/*  redirect to billing */}
          <AlertDialogAction
            disabled={false}
            onClick={() => {
              navigate("/dashboard/billing");
            }}
          >
            {t`Upgrade`} {" 🚀"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
