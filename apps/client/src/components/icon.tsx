import { useTheme } from "@reactive-resume/hooks";
import { cn } from "@reactive-resume/utils";

type Props = {
  size?: number;
  className?: string;
};

export const Icon = ({ size = 32, className }: Props) => {
  const { isDarkMode } = useTheme();

  let src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  switch (isDarkMode) {
    case false: {
      src = "/icon/Icon_Dark.svg";
      break;
    }
    case true: {
      src = "/icon/Icon_Light.svg";
      break;
    }
  }

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt="Talent Hub"
      className={cn("rounded-sm", className)}
    />
  );
};
