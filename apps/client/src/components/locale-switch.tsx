import { useLingui } from "@lingui/react";
import { Translate } from "@phosphor-icons/react";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@reactive-resume/ui";
import { useState } from "react";

import { changeLanguage } from "../providers/locale";
import { LocaleCombobox } from "./locale-combobox";

export const LocaleSwitch = () => {
  const { i18n } = useLingui();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <Translate size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0">
        <LocaleCombobox
          value={i18n.locale}
          onValueChange={async (locale) => {
            await changeLanguage(locale);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
