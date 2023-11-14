import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Check, Translate } from "@phosphor-icons/react";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useState } from "react";

import { changeLanguage } from "../providers/locale";
import { useLanguages } from "../services/resume/translation";

export const LocaleSwitch = () => {
  const { i18n } = useLingui();
  const { languages } = useLanguages();

  const [open, setOpen] = useState(false);

  const options = languages.map((language) => ({
    label: language.name,
    value: language.locale,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <Translate size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0">
        <Command>
          <CommandInput placeholder={t`Search for a language`} />
          <CommandEmpty>{t`No results found`}</CommandEmpty>
          <CommandGroup>
            <ScrollArea orientation="vertical">
              <div className="max-h-60">
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value.toLowerCase().trim()}
                    onSelect={async (selectedValue) => {
                      const option = options.find(
                        (option) => option.value.toLowerCase().trim() === selectedValue,
                      );

                      if (!option) return null;

                      await changeLanguage(option.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 opacity-0",
                        i18n.locale === option.value && "opacity-100",
                      )}
                    />
                    {option.label} <span className="ml-1 text-xs opacity-50">({option.value})</span>
                  </CommandItem>
                ))}
              </div>
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
