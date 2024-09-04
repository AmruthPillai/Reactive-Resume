import { useState } from 'react';
import { sortByDate } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useResumes } from "@/client/services/resume";
import { BaseListItem } from "./_components/base-item";
import { CreateResumeListItem } from "./_components/create-item";
import { ImportResumeListItem } from "./_components/import-item";
import { ResumeListItem } from "./_components/resume-item";

export const ListView = () => {
  const { resumes, loading, error } = useResumes();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('updatedAt');

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, filter: 'blur(8px)', transition: { duration: 0.5 } },
  };

  const filteredResumes = resumes
    ? resumes.filter(resume =>
        resume.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const sortedResumes = filteredResumes.sort((a, b) =>
    sortByDate(a, b, sortOption)
  );

  return (
    <div className="grid gap-y-2 md:grid-cols-2 lg:grid-cols-3">
      {error && (
        <div className="error-message p-4 bg-red-500 text-white rounded">
          <p>There was an error loading resumes. Please try again later.</p>
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search resumes..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input p-2 border border-gray-300 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
          className="sort-select p-2 border border-gray-300 rounded w-full"
        >
          <option value="updatedAt">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
      >
        <CreateResumeListItem />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        transition={{ delay: 0.1 }}
      >
        <ImportResumeListItem />
      </motion.div>

      {loading && (
        <div className="loading-spinner p-4 text-center">
          <p>Loading...</p>
        </div>
      )}

      {resumes && resumes.length === 0 && !loading && (
        <div className="empty-state p-4 text-center">
          <p>No resumes found. Create a new resume to get started.</p>
        </div>
      )}

      {sortedResumes.length > 0 && (
        <AnimatePresence>
          {sortedResumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={itemVariants}
              transition={{ delay: (index + 2) * 0.1 }}
            >
              <ResumeListItem resume={resume} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};
