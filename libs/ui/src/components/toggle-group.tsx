import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@reactive-resume/utils";
import { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { toggleVariants } from "../variants/toggle";

export const ToggleGroup = ToggleGroupPrimitive.Root;

export const ToggleGroupItem = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      toggleVariants({ variant, size, className }),
      "rounded-none first:rounded-l last:rounded-r",
    )}
    {...props}
  />
));
