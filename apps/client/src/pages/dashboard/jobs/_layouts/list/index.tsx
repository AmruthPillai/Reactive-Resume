/* eslint-disable lingui/no-unlocalized-strings */
import { sortByDate } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";

import { useJobs } from "@/client/services/job/job";

import { BaseListItem } from "./_components/item";
import { JobItem } from "./_components/job-item";

export const ListView = () => {
  const { jobs, loading } = useJobs();

  return (
    <div className="grid gap-y-2">
      {loading && (
        <>
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
            <BaseListItem className="min-h-32 bg-secondary/40" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          >
            <BaseListItem className="min-h-32 bg-secondary/40" />
          </motion.div>
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="duration-300 animate-in fade-in"
              style={{ animationFillMode: "backwards", animationDelay: `${i * 300}ms` }}
            >
              <BaseListItem className="min-h-32 bg-secondary/40" />
            </div>
          ))}
        </>
      )}

      {jobs && (
        <AnimatePresence>
          {jobs
            .sort((a, b) => sortByDate(a, b, "UpdatedAt"))
            .map((job, index) => (
              <motion.div
                key={job.Id}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0, transition: { delay: (index + 2) * 0.1 } }}
                exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.5 } }}
              >
                <JobItem job={job} />
              </motion.div>
            ))}
        </AnimatePresence>
      )}
    </div>
  );
};
