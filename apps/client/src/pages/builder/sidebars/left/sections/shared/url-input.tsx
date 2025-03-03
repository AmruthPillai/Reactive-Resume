import { t } from "@lingui/macro";
import { Tag } from "@phosphor-icons/react";
import type { URL } from "@reactive-resume/schema";
import { urlSchema } from "@reactive-resume/schema";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@reactive-resume/ui";
import { forwardRef, useMemo } from "react";

type Props = {
  id?: string;
  value: URL;
  placeholder?: string;
  onChange: (value: URL) => void;
};

export const URLInput = forwardRef<HTMLInputElement, Props>(
  ({ id, value, placeholder, onChange }, ref) => {
    const hasError = useMemo(() => !urlSchema.safeParse(value).success, [value]);

    return (
      <>
        <div className="flex gap-x-1">
          <Input
            ref={ref}
            id={id}
            value={value.href}
            className="flex-1"
            hasError={hasError}
            placeholder={placeholder}
            onChange={(event) => {
              const https = "https://";
              if (event.target.value.length > 0) {
                for (let i = 0; i < https.length; i++) {
                  const subString = https.slice(0, https.length - i);
                  if (event.target.value.includes(subString, 0)) {
                    event.target.value = event.target.value.slice(https.length - i);
                  }
                }
              }
              if (!event.target.value.includes(https, 0)) {
                event.target.value = https + event.target.value;
              }

              onChange({ ...value, href: event.target.value });
            }}
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
                onChange={(event) => {
                  onChange({ ...value, label: event.target.value });
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {hasError && <small className="opacity-75">{t`URL must start with https://`}</small>}
      </>
    );
  },
);
