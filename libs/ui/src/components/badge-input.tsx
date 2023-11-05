import { forwardRef, useCallback, useEffect, useState } from "react";

import { Input, InputProps } from "./input";

type BadgeInputProps = Omit<InputProps, "value" | "onChange"> & {
  value: string[];
  onChange: (value: string[]) => void;
};

export const BadgeInput = forwardRef<HTMLInputElement, BadgeInputProps>(
  ({ value, onChange, ...props }, ref) => {
    const [label, setLabel] = useState("");

    const processInput = useCallback(() => {
      const newLabels = label
        .split(",")
        .map((str) => str.trim())
        .filter(Boolean)
        .filter((str) => !value.includes(str));
      onChange([...new Set([...value, ...newLabels])]);
      setLabel("");
    }, [label, value, onChange]);

    useEffect(() => {
      if (label.includes(",")) {
        processInput();
      }
    }, [label, processInput]);

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();

        processInput();
      }
    };

    return (
      <Input
        {...props}
        ref={ref}
        value={label}
        onKeyDown={onKeyDown}
        onChange={(event) => setLabel(event.target.value)}
      />
    );
  },
);
