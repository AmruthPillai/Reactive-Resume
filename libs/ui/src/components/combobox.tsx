import { CaretDown, Check } from "@phosphor-icons/react";
import { cn } from "@reactive-resume/utils";
import { forwardRef, useState } from "react";

import { Button } from "./button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea } from "./scroll-area";

export interface ComboboxOption {
  value: string;
  label: React.ReactNode;
}

type ComboboxPropsSingle = {
  options: ComboboxOption[];
  emptyText?: string;
  clearable?: boolean;
  selectPlaceholder?: string;
  searchPlaceholder?: string;
  multiple?: false;
  value?: string;
  onValueChange?: (value: string) => void;
};

type ComboboxPropsMultiple = {
  options: ComboboxOption[];
  emptyText?: string;
  clearable?: boolean;
  selectPlaceholder?: string;
  searchPlaceholder?: string;
  multiple: true;
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

export type ComboboxProps = ComboboxPropsSingle | ComboboxPropsMultiple;

const handleSingleSelect = (props: ComboboxPropsSingle, option: ComboboxOption) => {
  if (props.clearable) {
    props.onValueChange?.(option.value === props.value ? "" : option.value);
  } else {
    props.onValueChange?.(option.value);
  }
};

const handleMultipleSelect = (props: ComboboxPropsMultiple, option: ComboboxOption) => {
  if (props.value?.includes(option.value)) {
    if (!props.clearable && props.value.length === 1) return false;
    props.onValueChange?.(props.value.filter((value) => value !== option.value));
  } else {
    props.onValueChange?.([...(props.value ?? []), option.value]);
  }
};

export const Combobox = forwardRef(
  (props: ComboboxProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [open, setOpen] = useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            variant="outline"
            aria-expanded={open}
            className="w-full justify-between hover:bg-secondary/20 active:scale-100"
          >
            <span className="line-clamp-1 text-left font-normal">
              {props.multiple && props.value && props.value.length > 0 && (
                <span className="mr-2">{props.value.join(", ")}</span>
              )}

              {!props.multiple &&
                props.value &&
                props.value !== "" &&
                props.options.find((option) => option.value === props.value)?.label}

              {!props.value ||
                (props.value.length === 0 && (props.selectPlaceholder ?? "Select an option"))}
            </span>
            <CaretDown
              className={cn(
                "ml-2 size-4 shrink-0 rotate-0 opacity-50 transition-transform",
                open && "rotate-180",
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <Command>
            <CommandInput
              ref={ref}
              placeholder={props.searchPlaceholder ?? "Search for an option"}
            />
            <CommandEmpty>{props.emptyText ?? "No results found"}</CommandEmpty>
            <CommandGroup>
              <ScrollArea orientation="vertical">
                <div className="max-h-60">
                  {props.options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value.toLowerCase().trim()}
                      onSelect={(selectedValue) => {
                        const option = props.options.find(
                          (option) => option.value.toLowerCase().trim() === selectedValue,
                        );

                        if (!option) return null;

                        if (props.multiple) {
                          handleMultipleSelect(props, option);
                        } else {
                          handleSingleSelect(props, option);

                          setOpen(false);
                        }
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4 opacity-0",
                          !props.multiple && props.value === option.value && "opacity-100",
                          props.multiple && props.value?.includes(option.value) && "opacity-100",
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </div>
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
