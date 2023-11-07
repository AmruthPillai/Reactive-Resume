import { isUrl } from "@reactive-resume/utils";

import { useArtboardStore } from "../store/artboard";

export const Picture = () => {
  const picture = useArtboardStore((state) => state.resume.basics.picture);

  if (!isUrl(picture.url) || picture.effects.hidden) return null;

  return (
    <img
      src={picture.url}
      alt="Profile"
      className="object-cover"
      style={{
        maxWidth: `${picture.size}px`,
        aspectRatio: `${picture.aspectRatio}`,
        borderRadius: `${picture.borderRadius}px`,
      }}
    />
  );
};
