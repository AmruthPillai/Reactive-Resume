import { createContext, memo, useState } from 'react';

const defaultState = {
  __setResumes: () => {},
  isUpdating: false,
  createResume: async () => {},
  duplicateResume: async () => {},
  deleteResume: () => {},
  getResume: async () => {},
  getResumes: async () => {},
  updateResume: async () => {},
  debouncedUpdateResume: async () => {},
};

const DatabaseContext = createContext(defaultState);

const DatabaseProvider = ({ children }) => {
  const [isUpdating] = useState(false);

  let resumes = {};

  const __setResumes = (newResumes) => {
    resumes = newResumes;
  };

  const getResume = async (id) => {
    try {
      const resume = await resumes.find((resume) => {
        return resume.id === id;
      });

      return resume !== 'undefined' ? resume : null;
    } catch (error) {
      return null;
    }
  };

  const createResume = async ({ name }) => {};

  const duplicateResume = async (originalResume) => {};

  const updateResume = async (resume) => {};

  const debouncedUpdateResume = {};

  const deleteResume = async (id) => {};

  return (
    <DatabaseContext.Provider
      value={{
        __setResumes,
        isUpdating,
        getResume,
        createResume,
        duplicateResume,
        updateResume,
        deleteResume,
        debouncedUpdateResume,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContext;

const memoizedProvider = memo(DatabaseProvider);

export { memoizedProvider as DatabaseProvider };
