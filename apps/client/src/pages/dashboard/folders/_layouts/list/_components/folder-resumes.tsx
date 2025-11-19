import { sortByDate } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router";

import { ResumeListItem } from "@/client/pages/dashboard/resumes/_layouts/list/_components/resume-item";
import { useFolder } from "@/client/services/folder";

export default function FolderResumesListView() {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { folder } = useFolder(id!);
  const resumes = folder?.resumes;
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
