import { Check } from "@phosphor-icons/react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@reactive-resume/utils";
import { forwardRef } from "react";

export const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-4 shrink-0 rounded border border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check size={12} weight="bold" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
