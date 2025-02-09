import { cn, isUrl } from "@reactive-resume/utils";

import { useArtboardStore } from "../store/artboard";

type PictureProps = {
  url?: string;
  effects?: {
    hidden?: boolean;
    border?: boolean;
    grayscale?: boolean;
  };
  size?: number;
  aspectRatio?: number;
  borderRadius?: number;
  className?: string;
};

export const Picture = ({
  url,
  effects,
  size,
  aspectRatio,
  borderRadius,
  className
}: PictureProps) => {
  const resumePicture = useArtboardStore((state) => state.resume.basics.picture);
  const fontSize = useArtboardStore((state) => state.resume.metadata.typography.font.size);

  // Use provided props or fall back to resume picture props
  const pictureUrl = url ?? resumePicture.url;
  const pictureEffects = effects ?? resumePicture.effects;
  const pictureSize = size ?? resumePicture.size;
  const pictureAspectRatio = aspectRatio ?? resumePicture.aspectRatio;
  const pictureBorderRadius = borderRadius ?? resumePicture.borderRadius;

  if (!isUrl(pictureUrl) || pictureEffects.hidden) return null;

  return (
    <img
      src={pictureUrl}
      alt="Profile"
      className={cn(
        "relative z-20 object-cover",
        pictureEffects.border && "border-primary",
        pictureEffects.grayscale && "grayscale",
        className,
      )}
      style={{
        maxWidth: `${pictureSize}px`,
        aspectRatio: `${pictureAspectRatio}`,
        borderRadius: `${pictureBorderRadius}px`,
        borderWidth: `${pictureEffects.border ? fontSize / 3 : 0}px`,
      }}
    />
  );
};
