import { forwardRef } from "react";

type BrandIconProps = {
  slug: string;
  className?: string;
};

export const BrandIcon = forwardRef<HTMLImageElement, BrandIconProps>(({ slug, className = "size-4" }, ref) => {
  if (slug.toLowerCase() === "linkedin") {
    return (
      <img
        ref={ref}
        alt="LinkedIn"
        className={className}
        src={`${window.location.origin}/support-logos/linkedin.svg`}
      />
    );
  }

  return (
    <img ref={ref} alt={slug} className={className} src={`https://cdn.simpleicons.org/${slug}`} />
  );
});

BrandIcon.displayName = "BrandIcon";
