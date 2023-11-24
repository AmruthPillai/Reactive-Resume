/* eslint-disable lingui/no-unlocalized-strings */

import { RocketLaunch } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";

export const ProductHuntBanner = () => {
  const timezonePST = "America/Los_Angeles";

  const startTime = dayjs.tz("2023-11-24 00:01", timezonePST);
  const endTime = dayjs.tz("2023-11-25 00:00", timezonePST);
  const currentTime = dayjs().tz(timezonePST);

  const isLaunchDay = currentTime.isAfter(startTime) && currentTime.isBefore(endTime);

  if (!isLaunchDay) return null;

  return (
    <a href="https://www.producthunt.com/posts/reactive-resume-v4" target="_blank" rel="noreferrer">
      <motion.div
        initial={{ opacity: 0, y: -50, height: 32 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.3 } }}
        whileHover={{ height: 48 }}
        className="flex w-screen items-center justify-center gap-x-1.5 bg-orange-600 text-xs font-bold leading-relaxed text-orange-50"
      >
        <RocketLaunch weight="bold" size={12} />
        <span>Support Reactive Resume on Product Hunt today!</span>
      </motion.div>
    </a>
  );
};
