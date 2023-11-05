import { CloudSun, Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "@reactive-resume/hooks";
import { Button } from "@reactive-resume/ui";
import { motion, Variants } from "framer-motion";
import { useMemo } from "react";

type Props = {
  size?: number;
};

export const ThemeSwitch = ({ size = 20 }: Props) => {
  const { theme, toggleTheme } = useTheme();

  const variants: Variants = useMemo(() => {
    return {
      light: { x: 0 },
      system: { x: size * -1 },
      dark: { x: size * -2 },
    };
  }, [size]);

  return (
    <Button size="icon" variant="ghost" onClick={toggleTheme}>
      <div className="cursor-pointer overflow-hidden" style={{ width: size, height: size }}>
        <motion.div animate={theme} variants={variants} className="flex">
          <Sun size={size} className="shrink-0" />
          <CloudSun size={size} className="shrink-0" />
          <Moon size={size} className="shrink-0" />
        </motion.div>
      </div>
    </Button>
  );
};
