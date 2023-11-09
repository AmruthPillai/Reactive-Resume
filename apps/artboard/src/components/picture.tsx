import { cn, isUrl } from "@reactive-resume/utils";

import { useArtboardStore } from "../store/artboard";

type PictureProps = {
  className?: string;
};

export const Picture = ({ className }: PictureProps) => {
  const picture = useArtboardStore((state) => state.resume.basics.picture);

  if (!isUrl(picture.url) || picture.effects.hidden) return null;

  return (
    <img
      src={picture.url}
      alt="Profile"
      className={cn("relative z-20 object-cover", className)}
      style={{
        maxWidth: `${picture.size}px`,
        aspectRatio: `${picture.aspectRatio}`,
        borderRadius: `${picture.borderRadius}px`,
      }}
    />
  );
};
