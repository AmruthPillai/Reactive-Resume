/* eslint-disable lingui/no-unlocalized-strings */

import { HandHeart } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export const DonationBanner = () => {
  return (
    <a href="https://opencollective.com/Reactive-Resume" target="_blank" rel="noreferrer">
      <motion.div
        whileHover={{ height: 48 }}
        initial={{ opacity: 0, y: -50, height: 32 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
        className="flex w-screen items-center justify-center gap-x-2 bg-zinc-800 text-xs font-bold leading-relaxed text-zinc-50"
      >
        <HandHeart weight="bold" size={14} className="shrink-0" />
        <span>
          If this project has helped you, please consider donating to Reactive Resume as we're
          running out of server resources with the increasing number of users.
        </span>
      </motion.div>
    </a>
  );
};
