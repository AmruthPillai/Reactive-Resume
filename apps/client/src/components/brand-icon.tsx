import { forwardRef, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";

type BrandIconProps = {
  slug: string;
};

export const BrandIcon = forwardRef<HTMLImageElement, BrandIconProps>(({ slug }, ref) => {
  const [debouncedSlug, setValue] = useDebounceValue(slug, 600);

  useEffect(() => {
    setValue(slug);
  }, [slug]);

  if (!slug) return null;

  if (debouncedSlug === "linkedin") {
    return (
      <img
        ref={ref}
        alt="LinkedIn"
        className="size-5"
        src={`${window.location.origin}/support-logos/linkedin.svg`}
      />
    );
  }

  return (
    <img
      ref={ref}
      alt={debouncedSlug}
      className="size-5"
      src={`https://cdn.simpleicons.org/${debouncedSlug}`}
    />
  );
});

BrandIcon.displayName = "BrandIcon";
