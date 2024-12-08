// portfolio-layout.tsx
import { PortfolioLayoutType, PortfolioLayoutConfig } from "@reactive-resume/schema";
import { cn } from "@reactive-resume/utils";
import { useArtboardStore } from "../store/artboard";

type PortfolioLayoutProps = {
  type: PortfolioLayoutType;
  children: React.ReactNode;
  className?: string;
};

const layoutStyles: Record<PortfolioLayoutType, string> = {
  stack: "flex flex-col",
  grid: "grid auto-rows-fr",
  masonry: "columns-1 sm:columns-2 lg:columns-3",
  fullwidth: "w-full",
};

export const PortfolioLayout: React.FC<PortfolioLayoutProps> = ({
  type,
  children,
  className,
}) => {
  const config = useArtboardStore<PortfolioLayoutConfig>(
    (state) => state.portfolio.metadata.layout.config
  );

  return (
    <div
      className={cn(layoutStyles[type], className)}
      style={{
        gap: `${config.spacing * 0.25}rem`,
        maxWidth: config.maxWidth,
        gridTemplateColumns: type === 'grid' ? `repeat(${config.columns}, 1fr)` : undefined,
      }}
    >
      {children}
    </div>
  );
};
