import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@reactive-resume/utils";
import { forwardRef } from "react";

export const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex size-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));

Avatar.displayName = AvatarPrimitive.Root.displayName;

export const AvatarImage = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square size-full object-cover", className)}
    {...props}
  />
));

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

export const AvatarFallback = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex size-full items-center justify-center rounded-full bg-secondary",
      className,
    )}
    {...props}
  />
));

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
