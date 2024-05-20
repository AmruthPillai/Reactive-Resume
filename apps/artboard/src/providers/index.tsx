import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useArtboardStore } from "../store/artboard";

export const Providers = () => {
  const resume = useArtboardStore((state) => state.resume);
  const setResume = useArtboardStore((state) => state.setResume);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "SET_RESUME") setResume(event.data.payload);
      if (event.data.type === "SET_THEME") {
        event.data.payload === "dark"
          ? document.documentElement.classList.add("dark")
          : document.documentElement.classList.remove("dark");
      }
    };

    const resumeData = window.localStorage.getItem("resume");
    if (resumeData) {
      setResume(JSON.parse(resumeData));
      return;
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setResume]);

  // Only for testing, in production this will be fetched from window.postMessage
  // useEffect(() => {
  //   setResume(sampleResume);
  // }, [setResume]);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!resume) return null;

  return <Outlet />;
};
