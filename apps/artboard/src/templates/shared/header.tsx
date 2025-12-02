import type { Basics } from "@reactive-resume/schema";
import { cn } from "@reactive-resume/utils";

import { Picture } from "../../components/picture";

type HeaderVariant = "centered" | "left-aligned" | "grid" | "minimal";

type HeaderProps = {
  basics: Basics;
  variant?: HeaderVariant;
  className?: string;
  showPicture?: boolean;
  pictureClassName?: string;
  nameClassName?: string;
  headlineClassName?: string;
  contactClassName?: string;
  contactItemClassName?: string;
  contactIconClassName?: string;
};

export const Header = ({
  basics,
  variant = "centered",
  className,
  showPicture = true,
  pictureClassName,
  nameClassName,
  headlineClassName,
  contactClassName,
  contactItemClassName,
  contactIconClassName,
}: HeaderProps) => {
  const renderContactItem = (icon: string, content: string | undefined, href?: string) => {
    if (!content) return null;

    const item = (
      <div className={cn("flex items-center gap-x-1.5", contactItemClassName)}>
        <i className={cn(`ph ph-bold ph-${icon}`, "text-primary", contactIconClassName)} />
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" className="underline">
            {content}
          </a>
        ) : (
          <div>{content}</div>
        )}
      </div>
    );

    return item;
  };

  const contactItems = [
    basics.location && renderContactItem("map-pin", basics.location),
    basics.phone && renderContactItem("phone", basics.phone, `tel:${basics.phone}`),
    basics.email && renderContactItem("at", basics.email, `mailto:${basics.email}`),
    basics.url.href && renderContactItem("link", basics.url.label || basics.url.href, basics.url.href),
    ...basics.customFields.map((field) => renderContactItem(field.icon, field.value, field.value)),
  ].filter(Boolean);

  const renderCentered = () => (
    <div className={cn("flex flex-col items-center justify-center space-y-2 pb-2 text-center", className)}>
      {showPicture && <Picture className={pictureClassName} />}

      <div>
        <div className={cn("text-2xl font-bold", nameClassName)}>{basics.name}</div>
        <div className={cn("text-base", headlineClassName)}>{basics.headline}</div>
      </div>

      <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm", contactClassName)}>
        {contactItems}
      </div>
    </div>
  );

  const renderLeftAligned = () => (
    <div className={cn("flex items-start gap-x-6", className)}>
      {showPicture && <Picture className={cn("flex-shrink-0", pictureClassName)} />}

      <div className="flex-1 space-y-2">
        <div>
          <div className={cn("text-2xl font-bold", nameClassName)}>{basics.name}</div>
          <div className={cn("text-base", headlineClassName)}>{basics.headline}</div>
        </div>

        <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm", contactClassName)}>
          {contactItems}
        </div>
      </div>
    </div>
  );

  const renderGrid = () => (
    <div className={cn("relative grid grid-cols-3 space-x-4 p-custom pb-0", className)}>
      {showPicture && <Picture className={cn("mx-auto", pictureClassName)} />}

      <div className="relative z-10 col-span-2 text-background">
        <div className="space-y-0.5">
          <h2 className={cn("text-3xl font-bold", nameClassName)}>{basics.name}</h2>
          <p className={headlineClassName}>{basics.headline}</p>
        </div>

        <div className={cn("col-span-2 col-start-2 mt-10 text-foreground", contactClassName)}>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
            {contactItems.map((item, index) => (
              <>
                {item}
                {index < contactItems.length - 1 && (
                  <div className="bg-text size-1 rounded-full last:hidden" />
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMinimal = () => (
    <div className={cn("space-y-4 bg-primary p-custom text-background", className)}>
      {showPicture && <Picture className={cn("border-background", pictureClassName)} />}

      <div>
        <h2 className={cn("text-2xl font-bold", nameClassName)}>{basics.name}</h2>
        <p className={headlineClassName}>{basics.headline}</p>
      </div>

      <div className={cn("flex flex-col items-start gap-y-2 text-sm", contactClassName)}>
        {contactItems}
      </div>
    </div>
  );

  switch (variant) {
    case "centered":
      return renderCentered();
    case "left-aligned":
      return renderLeftAligned();
    case "grid":
      return renderGrid();
    case "minimal":
      return renderMinimal();
    default:
      return renderCentered();
  }
};
