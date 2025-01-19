import { t } from "@lingui/macro";
import { Info } from "@phosphor-icons/react";
import { Alert, AlertDescription, AlertTitle } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";

import { useResumeStatistics } from "@/client/services/resume";
import { useResumeStore } from "@/client/stores/resume";

import { SectionIcon } from "../shared/section-icon";

export const StatisticsSection = () => {
  const id = useResumeStore((state) => state.resume.id);
  const isPublic = useResumeStore((state) => state.resume.visibility === "public");

  const { statistics } = useResumeStatistics(id, isPublic);

  return (
    <section id="statistics" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="statistics" size={18} name={t`Statistics`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Statistics`}</h2>
        </div>
      </header>

      <main className="grid grid-cols-2 gap-y-4">
        <AnimatePresence>
          {!isPublic && (
            <motion.div
              className="col-span-2"
              initial={{ opacity: 0, y: -50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
            >
              <Alert variant="info">
                <Info size={18} />
                <AlertTitle>{t`Statistics are available only for public resumes.`}</AlertTitle>
                <AlertDescription className="text-xs leading-relaxed">
                  {t`You can track the number of views your resume has received, or how many people have downloaded the resume by enabling public sharing.`}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <h3 className={cn("text-4xl font-bold blur-none transition-all", !isPublic && "blur-sm")}>
            {statistics?.views ?? 0}
          </h3>
          <p className="opacity-75">{t`Views`}</p>
        </div>

        <div>
          <h3 className={cn("text-4xl font-bold blur-none transition-all", !isPublic && "blur-sm")}>
            {statistics?.downloads ?? 0}
          </h3>
          <p className="opacity-75">{t`Downloads`}</p>
        </div>
      </main>
    </section>
  );
};
