import type { FolderDto } from "@reactive-resume/dto";
import { sortByDate } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";

import { ResumeListItem } from "@/client/pages/dashboard/resumes/_layouts/list/_components/resume-item";
type Props = {
  folder: FolderDto;
};
export default function FolderResumesListView({ folder }: Props) {
  const resumes = folder.resumes;
  return (
    <div className="grid gap-y-2">
      {resumes && (
        <AnimatePresence>
          {resumes
            .sort((a, b) => sortByDate(a, b, "updatedAt"))
            .map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0, transition: { delay: (index + 2) * 0.1 } }}
                exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.5 } }}
              >
                <ResumeListItem resume={resume} />
              </motion.div>
            ))}
        </AnimatePresence>
      )}
    </div>
  );
}
