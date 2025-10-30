import { t } from "@lingui/macro";
import { Button } from "@reactive-resume/ui";
import { Link } from "react-router";

import { useEntitlements } from "@/client/services/account/account";
import { useUser } from "@/client/services/user";

export const Paid2faNudge = () => {
  const { data: ent } = useEntitlements();
  const { user } = useUser();
  const isPaid = !!(
    ent && (ent.plan === "lifetime" || ent.hasAI || (ent.templatesCap ?? 0) >= 10)
  );
  const needs2FA = !!(isPaid && user && !user.twoFactorEnabled);

  if (!needs2FA) return null;

  return (
    <div className="mb-4 rounded border border-amber-400 bg-amber-50 p-3 text-amber-900">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm">
          {t`Protect your premium access: enable Two‑Factor Authentication (2FA) to secure your account and reduce interruptions.`}
        </p>
        <Button asChild size="sm" variant="outline" className="shrink-0">
          <Link to="/dashboard/settings">{t`Enable 2FA`}</Link>
        </Button>
      </div>
    </div>
  );
};

