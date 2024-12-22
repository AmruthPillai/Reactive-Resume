import { cn } from "@reactive-resume/utils";
import { PortfolioTemplateProps } from "./types";

type BaseTemplateProps = PortfolioTemplateProps & {
  children: React.ReactNode;
  className?: string;
};

export const BaseTemplate: React.FC<BaseTemplateProps> = ({ 
  data,
  children,
  className 
}) => {
  const { typography, theme } = data.metadata;

  return (
    <div
      className={cn(
        "min-h-screen w-full",
        typography.font.family,
        className
      )}
      style={{
        "--font-family": typography.font.family,
        "--font-size": `${typography.font.size}px`,
        "--line-height": typography.lineHeight,
        "--color-background": theme.background,
        "--color-text": theme.text,
        "--color-primary": theme.primary,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
