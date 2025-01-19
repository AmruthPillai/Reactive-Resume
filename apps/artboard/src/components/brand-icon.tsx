import { forwardRef } from "react";

type BrandIconProps = {
  slug: string;
};

export const BrandIcon = forwardRef<HTMLImageElement, BrandIconProps>(({ slug }, ref) => {
  if (slug === "linkedin") {
    return (
      <img
        ref={ref}
        alt="LinkedIn"
        className="size-4"
        src={`${window.location.origin}/support-logos/linkedin.svg`}
      />
    );
  }

  return (
    <img ref={ref} alt={slug} className="size-4" src={`https://cdn.simpleicons.org/${slug}`} />
  );
});

BrandIcon.displayName = "BrandIcon";
