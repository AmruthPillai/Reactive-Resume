import { t } from "@lingui/macro";
import { PortfolioDto } from "@reactive-resume/dto";
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

import { useLockPortfolio } from "@/client/services/portfolio";
import { useDialog } from "@/client/stores/dialog";

export const LockDialog = () => {
  const { isOpen, mode, payload, close } = useDialog<PortfolioDto>("lock");

  const isLockMode = mode === "create";
  const isUnlockMode = mode === "update";

  const { lockPortfolio, loading } = useLockPortfolio();

  const onSubmit = async () => {
    if (!payload.item) return;

    await lockPortfolio({ id: payload.item.id, set: isLockMode });

    close();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isLockMode && t`Are you sure you want to lock this portfolio?`}
            {isUnlockMode && t`Are you sure you want to unlock this portfolio?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isLockMode &&
              t`Locking a portfolio will prevent any further changes to it. This is useful when you have already shared your portfolio with someone and you don't want to accidentally make any changes to it.`}
            {isUnlockMode && t`Unlocking a portfolio will allow you to make changes to it again.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{t`Cancel`}</AlertDialogCancel>
          <AlertDialogAction variant="info" disabled={loading} onClick={onSubmit}>
            {isLockMode && t`Lock`}
            {isUnlockMode && t`Unlock`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
