import { t } from "@lingui/macro";
import type { UrlDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@reactive-resume/ui";

import { toast } from "@/client/hooks/use-toast";
import { axios } from "@/client/libs/axios";
import { useDialogStore } from "@/client/stores/dialog";

export const printResume = async (data: { id: string }) => {
  const response = await axios.get<UrlDto>(`/resume/print/${data.id}`);

  return response.data;
};

export const usePrintResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: printResumeFn,
  } = useMutation({
    mutationFn: printResume,
    onError: (error) => {
      const message = error.message || "";

      // Friendly UX for quota error: prompt to enable 2FA with a one‑click action
      if (message.includes("Daily export limit") && message.includes("Enable 2FA")) {
        toast({
          variant: "error",
          title: t`Daily export limit reached`,
          description: t`Enable Two‑Factor Authentication (2FA) to continue exporting today.`,
          action: (
            <Button
              size="sm"
              onClick={() => {
                // Open Security settings in a new tab for clarity
                const url = "/dashboard/settings?tab=security";
                if (!window.location.pathname.startsWith("/dashboard")) {
                  window.open(url, "_self");
                } else {
                  // If already on dashboard, just open the 2FA dialog directly
                  useDialogStore.setState({ dialog: { name: "two-factor", mode: "create" } as any });
                }
              }}
            >
              {t`Enable 2FA`}
            </Button>
          ),
        });
        return;
      }

      toast({
        variant: "error",
        title: t`Oops, the server returned an error.`,
        description: message,
      });
    },
  });

  return { printResume: printResumeFn, loading, error };
};
