import { t } from "@lingui/macro";
import { LinkSimple, Tag } from "@phosphor-icons/react";
import type { URLWithBind } from "@reactive-resume/schema";
import { urlWithBindSchema } from "@reactive-resume/schema";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Toggle,
  Tooltip,
} from "@reactive-resume/ui";
import { forwardRef, useMemo } from "react";

type Props = {
  id?: string;
  value: URLWithBind;
  placeholder?: string;
  onChange: (value: URLWithBind) => void;
};

export const URLBind = forwardRef<HTMLInputElement, Props>(
  ({ id, value, placeholder, onChange }, ref) => {
    const hasError = useMemo(() => !urlWithBindSchema.safeParse(value).success, [value]);

    const fieldName = t`Institution`;

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

          <Tooltip content={value.bind ? t`Unbind from ${fieldName}` : t`Bind to ${fieldName}`}>
            <Toggle
              className={value.bind ? "bg-secondary" : "bg-transparent"}
              pressed={value.bind}
              onPressedChange={(pressed: boolean) => {
                onChange({ ...value, bind: pressed });
              }}
            >
              <LinkSimple />
            </Toggle>
          </Tooltip>
        </div>
        {hasError && <small className="opacity-75">{t`URL must start with https://`}</small>}
      </>
    );
  },
);
