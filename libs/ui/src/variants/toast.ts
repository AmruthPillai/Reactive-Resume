import { cva } from "class-variance-authority";

export const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        primary: "group/primary border-primary bg-primary text-primary-foreground",
        secondary: "group/secondary border-secondary bg-secondary text-secondary-foreground",
        error: "group/error border-error bg-error text-error-foreground",
        warning: "group/warning border-warning bg-warning text-warning-foreground",
        info: "group/info border-info bg-info text-info-foreground",
        success: "group/success border-success bg-success text-success-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
