import { cn } from "@reactive-resume/utils";

type BrandIconProps = {
  slug: string;
};

export const BrandIcon = ({ slug }: BrandIconProps) => {
  if (slug === "linkedin") {
    return (
      <img
        alt="LinkedIn"
        className="size-4"
        src={`${window.location.origin}/support-logos/linkedin.svg`}
      />
    );
  }

  return <i className={cn("si si--color text-[1rem]", `si-${slug}`)} />;
};
