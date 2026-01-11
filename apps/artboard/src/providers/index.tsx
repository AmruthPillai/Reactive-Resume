import { defaultPortfolioData, defaultResumeData } from "@reactive-resume/schema";
import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";

import { useArtboardStore } from "../store/artboard";

export const Providers = () => {
  const [searchParams] = useSearchParams();
  const mode = (searchParams.get("mode") ?? "resume") as "resume" | "portfolio";

  const setResume = useArtboardStore((state) => state.setResume);
  const setPortfolio = useArtboardStore((state) => state.setPortfolio);
  const setMode = useArtboardStore((state) => state.setMode);

  useEffect(() => {
    setMode(mode);

    const fetchPortfolio = async () => {
      try {
        const id = searchParams.get("id");
        const username = searchParams.get("username");
        const slug = searchParams.get("slug");

        let res: Response | null = null;

        if (username && slug) {
          res = await fetch(`/api/portfolio/public/${encodeURIComponent(username)}/${encodeURIComponent(slug)}`);
        } else if (id) {
          res = await fetch(`/api/portfolio/${encodeURIComponent(id)}`);
        }

        if (res && res.ok) {
          const data = await res.json();
          // response will be a PortfolioDto; set the nested `data` field into artboard store
          setPortfolio(data.data || data);
        }
      } catch (err) {
        // silently ignore — artboard can still render defaults or receive postMessage
        // eslint-disable-next-line no-console
        console.debug("Failed to fetch portfolio for artboard", err);
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      switch (event.data.type) {
        case "SET_RESUME": {
          setResume(event.data.payload || defaultResumeData);
          break;
        }
        case "SET_PORTFOLIO": {
          setPortfolio(event.data.payload || defaultPortfolioData);
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

    // Initialize with schema defaults
    if (mode === "portfolio") {
      setPortfolio(defaultPortfolioData);
      // Try to fetch real portfolio if query params provided
      void fetchPortfolio();
    } else {
      setResume(defaultResumeData);
    }

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [mode, setMode, setResume, setPortfolio]);

  return <Outlet />;
};
