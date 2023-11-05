import { cn } from "@reactive-resume/utils";
import { useEffect } from "react";
import { useBoolean } from "usehooks-ts";

// Keyboard Icons
// Shift ⇧
// Control ⌃
// Option ⌥
// Command ⌘

type KeyboardShortcutProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "defaultValue"> & {
  defaultValue?: boolean;
};

export const KeyboardShortcut = ({
  className,
  defaultValue = false,
  ...props
}: KeyboardShortcutProps) => {
  const { value, setValue } = useBoolean(defaultValue);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === "Control" && setValue(true);
    const onKeyUp = (e: KeyboardEvent) => e.key === "Control" && setValue(false);

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [setValue]);

  return (
    <span
      className={cn(
        "ml-auto scale-0 text-xs tracking-widest opacity-0 transition-[opacity]",
        value && "scale-100 opacity-60",
        className,
      )}
      {...props}
    />
  );
};

KeyboardShortcut.displayName = "KeyboardShortcut";
