import { t } from "@lingui/macro";
import { Button } from "@reactive-resume/ui";
import dayjs from "dayjs";

import { useRevokeSession, useSessions } from "@/client/services/account/sessions";

export const SessionsSettings = () => {
  const { data: sessions = [], isPending } = useSessions();
  const revoke = useRevokeSession();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight">{t`Active Sessions`}</h3>
        <p className="leading-relaxed opacity-75">
          {t`You can sign out other browsers and devices from here. This helps keep your account secure.`}
        </p>
      </div>

      <div className="overflow-x-auto">
        {isPending ? (
          <div className="text-sm text-muted-foreground">{t`Loading...`}</div>
        ) : sessions.length === 0 ? (
          <div className="text-sm text-muted-foreground">{t`No active sessions.`}</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2">{t`Last Used`}</th>
                <th className="py-2">{t`Device`}</th>
                <th className="py-2">{t`IP`}</th>
                <th className="py-2" />
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="py-2">{dayjs(s.lastUsedAt).format("YYYY-MM-DD HH:mm")}</td>
                  <td className="py-2">{s.userAgent || t`Unknown`}</td>
                  <td className="py-2">{s.ip || "-"}</td>
                  <td className="py-2">
                    <Button size="sm" variant="outline" onClick={() => revoke.mutate(s.id)}>
                      {t`Sign out`}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

