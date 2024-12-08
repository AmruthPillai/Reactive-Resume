// portfolio-navigation.tsx
import { PortfolioNavigation as IPortfolioNavigation } from "@reactive-resume/schema";
import { cn } from "@reactive-resume/utils";
import { useArtboardStore } from "../store/artboard";
import { useEffect, useState } from "react";

export const PortfolioNavigation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const navigation = useArtboardStore<IPortfolioNavigation>(
    (state) => state.portfolio.metadata.navigation
  );
  const { style, transparent, showOnScroll } = navigation;

  useEffect(() => {
    if (!showOnScroll) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, showOnScroll]);

  return (
    <nav
      className={cn(
        "w-full transition-all duration-300",
        style === "fixed" && "fixed top-0",
        style === "sticky" && "sticky top-0",
        style === "floating" && "fixed top-4 left-1/2 -translate-x-1/2 rounded-full",
        transparent && "bg-transparent",
        !transparent && "bg-background/80 backdrop-blur-sm",
        showOnScroll && !isVisible && "-translate-y-full"
      )}
    >
      {/* Navigation content will go here */}
    </nav>
  );
};
