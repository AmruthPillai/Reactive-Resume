import { t } from "@lingui/macro";
import { Tag } from "@phosphor-icons/react";
import { URL, urlSchema } from "@reactive-resume/schema";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@reactive-resume/ui";
import { forwardRef, useMemo } from "react";

interface Props {
  id?: string;
  value: URL;
  placeholder?: string;
  onChange: (value: URL) => void;
}

export const URLInput = forwardRef<HTMLInputElement, Props>(
  ({ id, value, placeholder, onChange }, ref) => {
    const hasError = useMemo(() => urlSchema.safeParse(value).success === false, [value]);

    return (
      <>
        <div className="flex gap-x-1">
          <Input
            id={id}
            ref={ref}
            value={value.href}
            className="flex-1"
            hasError={hasError}
            placeholder={placeholder}
            onChange={(event) => onChange({ ...value, href: event.target.value })}
          />

          <Popover>
            <Tooltip content={t`Label`}>
              <PopoverTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Tag />
                </Button>
              </PopoverTrigger>
            </Tooltip>
            <PopoverContent className="p-1.5">
              <Input
                value={value.label}
                placeholder={t`Label`}
                onChange={(event) => onChange({ ...value, label: event.target.value })}
              />
            </PopoverContent>
          </Popover>
        </div>

        {hasError && <small className="opacity-75">{t`URL must start with https://`}</small>}
      </>
    );
  },
);
