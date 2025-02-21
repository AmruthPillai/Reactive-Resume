import { t } from "@lingui/macro";
import React, { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { queryClient } from "@/client/libs/query-client";
import { findResumeById } from "@/client/services/resume";
import { useAuthStore } from "@/client/stores/auth";
import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";

export const PublicProfilePage = () => {
  const [hasSet, set] = React.useState<boolean>(false);
  const { user } = useAuthStore();
  const resume = useResumeStore((state) => state.resume);

  const frameRef = useBuilderStore((state) => state.frame.ref);
  const setFrameRef = useBuilderStore((state) => state.frame.setRef);

  const syncResumeToArtboard = useCallback(() => {
    setImmediate(() => {
      if (!frameRef?.contentWindow) return;
      const message = { type: "SET_RESUME", payload: resume.data };
      frameRef.contentWindow.postMessage(message, "*");
    });
  }, [frameRef?.contentWindow, resume.data]);

  useEffect(() => {
    const fetchData = async () => {
      if (user === null || user.profileResumeId) return;
      const id = user.profileResumeId!;

      const resume = await queryClient.fetchQuery({
        queryKey: ["resume", { id }],
        queryFn: () => findResumeById({ id }),
      });

      useResumeStore.setState({ resume });
      useResumeStore.temporal.getState().clear();

      const l = useResumeStore((state) => state.resume).data;
      console.log(l);
      set(true);
    };

    fetchData();
  }, [hasSet]);

  useEffect(() => {
    if (!frameRef) return;

    frameRef.addEventListener("load", syncResumeToArtboard);

    return () => {
      frameRef.removeEventListener("load", syncResumeToArtboard);
    };
  }, [frameRef]);

  return (
    <div>
      <Helmet>
        <title>
          {t`Public Page`} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <iframe
        ref={setFrameRef}
        title={resume.id}
        src="/artboard/builder"
        className="mt-16 w-screen"
        style={{ height: `calc(100vh - 64px)` }}
      />
    </div>
  );
};
