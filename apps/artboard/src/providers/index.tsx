import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";

import { useArtboardStore } from "../store/artboard";

export const Providers = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") ?? "resume";

  const setResume = useArtboardStore((state) => state.setResume);
  const setPortfolio = useArtboardStore((state) => state.setPortfolio);
  const setMode = useArtboardStore((state) => state.setMode);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      switch (event.data.type) {
        case "SET_RESUME": {
          setResume(event.data.payload);
          break;
        }
        case "SET_PORTFOLIO": {
          setPortfolio(event.data.payload);
          break;
        }
        case "SET_THEME": {
          event.data.payload === "dark"
            ? document.documentElement.classList.add("dark")
            : document.documentElement.classList.remove("dark");
          break;
        }
      }
    };

    // Set mode based on URL parameter
    setMode(mode as "resume" | "portfolio");

    // Try to load data from localStorage first (for development/testing)
    if (mode === "portfolio") {
      const portfolioData = window.localStorage.getItem("portfolio");
      if (portfolioData) {
        setPortfolio(JSON.parse(portfolioData));
        return;
      }
    } else {
      const resumeData = window.localStorage.getItem("resume");
      if (resumeData) {
        setResume(JSON.parse(resumeData));
        return;
      }
    }

    // Listen for messages from parent window
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setResume, setPortfolio, setMode, mode]);

  // Verify that required data is loaded
  const resume = useArtboardStore((state) => state.resume);
  const portfolio = useArtboardStore((state) => state.portfolio);

  const isDataLoaded = mode === "portfolio" ? portfolio : resume;


  return <Outlet />;
};
