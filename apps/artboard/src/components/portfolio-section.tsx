import { PortfolioSection as IPortfolioSection } from "@reactive-resume/schema";
import { cn } from "@reactive-resume/utils";

type PortfolioSectionProps = {
  section: IPortfolioSection;
  children: React.ReactNode;
  className?: string;
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  section,
  children,
  className,
}) => {
  return (
    <section
      id={section.id}
      className={cn(
        "relative",
        section.fullWidth ? "w-full" : "container mx-auto px-4",
        className
      )}
    >
      {section.name && (
        <h2 className="mb-8 text-2xl font-bold text-center">{section.name}</h2>
      )}
      {children}
    </section>
  );
};
