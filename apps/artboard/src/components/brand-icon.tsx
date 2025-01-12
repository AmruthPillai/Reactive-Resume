type BrandIconProps = {
  slug: string;
};

export const BrandIcon = ({ slug }: BrandIconProps) => {
  if (slug === "linkedin") {
    return (
      <img
        alt="linkedin"
        className="size-4"
        src={`${window.location.origin}/support-logos/linkedin.svg`}
      />
    );
  }

  return <img alt={slug} className="size-4" src={`https://cdn.simpleicons.org/${slug}`} />;
};
