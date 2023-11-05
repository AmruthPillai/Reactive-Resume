import { cva } from "class-variance-authority";

export const alertVariants = cva(
  "relative w-full rounded p-4 transition-colors [&>svg+div]:translate-y-[-4px] [&>svg]:absolute [&>svg]:left-3.5 [&>svg]:top-[18px] [&>svg~*]:pl-6",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground [&>svg]:text-foreground",
        primary: "bg-primary text-primary-foreground [&>svg]:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground [&>svg]:text-secondary-foreground",
        error: "bg-error text-error-foreground [&>svg]:text-error-foreground",
        warning: "bg-warning text-warning-foreground [&>svg]:text-warning-foreground",
        info: "bg-info text-info-foreground [&>svg]:text-info-foreground",
        success: "bg-success text-success-foreground [&>svg]:text-success-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
