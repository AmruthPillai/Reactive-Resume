import React, { createContext, memo, useState } from 'react';

let resumes = [];

const __setResumes = (value) => {
  resumes = value;
};

const defaultState = {
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

export { __setResumes };
