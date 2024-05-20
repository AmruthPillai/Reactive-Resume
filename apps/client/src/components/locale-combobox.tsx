import { t } from "@lingui/macro";
import { CaretDown, Check } from "@phosphor-icons/react";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import fuzzy from "fuzzy";
import { useMemo, useState } from "react";

import { useLanguages } from "../services/resume/translation";

type Props = {
  value: string;
  onValueChange: (locale: string) => void;
};

export const LocaleCombobox = ({ value, onValueChange }: Props) => {
  const { languages } = useLanguages();
  const [search, setSearch] = useState("");

  const options = useMemo(() => {
    return fuzzy.filter(search, languages, {
      extract: (lang) => `${lang.name} ${lang.locale}`,
    });
  }, [search, languages]);

  return (
    <Command shouldFilter={false}>
      <CommandInput
        value={search}
        placeholder={t`Search for a language`}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>{t`No results found`}</CommandEmpty>
        <CommandGroup>
          <ScrollArea orientation="vertical">
            <div className="max-h-60">
              {options.map(({ original }) => (
                <CommandItem
                  key={original.locale}
                  disabled={false}
                  value={original.locale.trim()}
                  onSelect={(selectedValue) => {
                    const result = options.find(
                      ({ original }) => original.locale.trim() === selectedValue,
                    );

                    if (!result) return null;

                    onValueChange(result.original.locale);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4 opacity-0",
                      value === original.locale && "opacity-100",
                    )}
                  />
                  {original.name}{" "}
                  <span className="ml-1 text-xs opacity-50">({original.locale})</span>
                </CommandItem>
              ))}
            </div>
          </ScrollArea>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export const LocaleComboboxPopover = ({ value, onValueChange }: Props) => {
  const { languages } = useLanguages();
  const [open, setOpen] = useState(false);

  const selected = useMemo(() => {
    return languages.find((lang) => lang.locale === value);
  }, [value, languages]);

  const onSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setOpen(false);
  };

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
            {selected?.name} <span className="ml-1 text-xs opacity-50">({selected?.locale})</span>
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
        <LocaleCombobox value={value} onValueChange={onSelect} />
      </PopoverContent>
    </Popover>
  );
};
