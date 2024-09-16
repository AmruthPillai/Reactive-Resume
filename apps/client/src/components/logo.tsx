import { useTheme } from "@reactive-resume/hooks";
import { cn } from "@reactive-resume/utils";

type Props = {
  size?: number;
  className?: string;
};

export const Logo = ({ size = 32, className }: Props) => {
  const { isDarkMode } = useTheme();

  const src: string = isDarkMode ? "/logo/dark.svg" : "/logo/light.svg";

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt="Reactive Resume"
      className={cn("rounded-sm", className)}
    />
  );
};
