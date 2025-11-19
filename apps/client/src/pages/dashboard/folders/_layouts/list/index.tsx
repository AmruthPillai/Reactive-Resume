import { sortByDate } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";

import { useFolders } from "@/client/services/folder";

import { BaseListItem } from "./_components/base-item";
import { CreateFolderListItem } from "./_components/create-item";
import { FolderListItem } from "./_components/folder-item";

export const ListView = () => {
  const { folders, loading: foldersLoading } = useFolders();
  const loading = foldersLoading;
  return (
    <div className="grid gap-y-2">
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
        <CreateFolderListItem />
      </motion.div>

      {loading &&
        Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="duration-300 animate-in fade-in"
            style={{ animationFillMode: "backwards", animationDelay: `${i * 300}ms` }}
          >
            <BaseListItem className="bg-secondary/40" />
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
                <FolderListItem folder={folder} />
              </motion.div>
            ))}
        </AnimatePresence>
      )}
    </div>
  );
};
