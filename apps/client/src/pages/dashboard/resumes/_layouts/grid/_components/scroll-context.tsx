import { createContext, useContext, useEffect, useState } from "react";

type ScrollContextType = {
  isScrolling: boolean;
};

const ScrollContext = createContext<ScrollContextType>({ isScrolling: false });

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150); // Debounce time for scroll end detection
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ isScrolling }}>
      {children}
    </ScrollContext.Provider>
  );
}; 