import { t } from "@lingui/macro";
import { Check } from "@phosphor-icons/react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
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
        onValueChange={setSearch}
        placeholder={t`Search for a language`}
      />
      <CommandEmpty>{t`No results found`}</CommandEmpty>
      <CommandGroup>
        <ScrollArea orientation="vertical">
          <div className="max-h-60">
            {options.map(({ original }) => (
              <CommandItem
                key={original.locale}
                value={original.locale.trim().toLowerCase()}
                onSelect={async (selectedValue) => {
                  const result = options.find(
                    ({ original }) => original.locale.trim().toLowerCase() === selectedValue,
                  );

                  if (!result) return null;

                  onValueChange(result.original.locale);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 opacity-0",
                    value === original.locale && "opacity-100",
                  )}
                />
                {original.name} <span className="ml-1 text-xs opacity-50">({original.locale})</span>
              </CommandItem>
            ))}
          </div>
        </ScrollArea>
      </CommandGroup>
    </Command>
  );
};
