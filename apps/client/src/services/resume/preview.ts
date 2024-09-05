import { ResumeData } from "@reactive-resume/schema";
import { useCallback, useEffect, useRef } from "react";

export const useResumePreview = (resume: ResumeData) => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const updateResumeInFrame = useCallback(() => {
    if (!frameRef.current?.contentWindow) return;
    const message = { type: "SET_RESUME", payload: resume };
    (() => {
      frameRef.current.contentWindow.postMessage(message, "*");
    })();
  }, [frameRef, resume]);

  useEffect(() => {
    if (!frameRef.current) return;
    frameRef.current.addEventListener("load", updateResumeInFrame);

    return () => frameRef.current?.removeEventListener("load", updateResumeInFrame);
  }, [frameRef]);

  return frameRef;
};