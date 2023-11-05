import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "border-primary bg-primary text-primary-foreground",
        secondary: "border-secondary bg-secondary text-secondary-foreground",
        error: "border-error bg-error text-error-foreground",
        warning: "border-warning bg-warning text-warning-foreground",
        info: "border-info bg-info text-info-foreground",
        success: "border-success bg-success text-success-foreground",
      },
      outline: {
        true: "bg-transparent",
      },
    },
    compoundVariants: [
      { outline: true, variant: "primary", className: "text-primary" },
      { outline: true, variant: "secondary", className: "text-secondary" },
      { outline: true, variant: "error", className: "text-error" },
      { outline: true, variant: "warning", className: "text-warning" },
      { outline: true, variant: "info", className: "text-info" },
      { outline: true, variant: "success", className: "text-success" },
    ],
    defaultVariants: {
      variant: "primary",
      outline: false,
    },
  },
);
