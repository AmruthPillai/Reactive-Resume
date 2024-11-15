import { CloudSun, Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "@reactive-resume/hooks";
import { Button } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

type Props = {
  size?: number;
};

export const ThemeSwitch = ({ size = 20 }: Props) => {
  const { theme, toggleTheme } = useTheme();

  return <div></div>;
  return (
    <Button size="icon" variant="ghost" onClick={toggleTheme}>
      <div className="cursor-pointer overflow-hidden" style={{ width: size, height: size }}>
        <Sun size={size} className={cn(theme === "light" ? "" : "hidden")} />
        <CloudSun size={size} className={cn(theme === "system" ? "" : "hidden")} />
        <Moon size={size} className={cn(theme === "dark" ? "" : "hidden")} />
      </div>
    </Button>
  );
};
