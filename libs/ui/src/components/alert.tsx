import { cn } from "@reactive-resume/utils";
import { type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { alertVariants } from "../variants/alert";

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  ),
);

Alert.displayName = "Alert";

export const AlertTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h5 ref={ref} className={cn("font-medium tracking-tight", className)} {...props}>
    {children}
  </h5>
));

AlertTitle.displayName = "AlertTitle";

export const AlertDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0.5 leading-normal", className)} {...props} />
));

AlertDescription.displayName = "AlertDescription";
