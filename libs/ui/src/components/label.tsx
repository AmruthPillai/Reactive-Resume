import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@reactive-resume/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

export const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
);

export const Label = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));

Label.displayName = LabelPrimitive.Root.displayName;
