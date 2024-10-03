import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";

type Props = {
  className?: string;
};

export const ActiveIndicator = ({ className }: Props) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={cn("size-3 animate-pulse rounded-full bg-info shadow shadow-info", className)}
  />
);
