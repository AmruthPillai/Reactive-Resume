import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1400,
};

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
