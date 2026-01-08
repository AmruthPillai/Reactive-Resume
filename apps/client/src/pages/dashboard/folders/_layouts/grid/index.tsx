import { sortByDate } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";

import { useFolders } from "@/client/services/folder";

import { BaseCard } from "./_components/base-card";
import { CreateFolderCard } from "./_components/create-folder";
import { FolderCard } from "./_components/folder-card";

export const GridView = () => {
  const { folders, loading: foldersLoading } = useFolders();
  const loading = foldersLoading;
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
        <CreateFolderCard />
      </motion.div>

      {loading &&
        Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="duration-300 animate-in fade-in"
            style={{ animationFillMode: "backwards", animationDelay: `${i * 300}ms` }}
          >
            <BaseCard />
          </div>
        ))}

      {folders && (
        <AnimatePresence>
          {folders
            .sort((a, b) => sortByDate(a, b, "updatedAt"))
            .map((folder, index) => (
              <motion.div
                key={folder.id}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0, transition: { delay: (index + 2) * 0.1 } }}
                exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.5 } }}
              >
                <FolderCard folder={folder} />
              </motion.div>
            ))}
        </AnimatePresence>
      )}
    </div>
  );
};
