import { useMutation } from "@tanstack/react-query";
import type { Resume } from "@reactive-resume/schema";

import { RESUME_KEY, RESUMES_KEY } from "@/client/constants/query-keys";
import { resumes as resumeClient } from "@/client/lib/supabase";
import { queryClient } from "@/client/libs/query-client";

type LockResumeArgs = {
  id: string;
  set: boolean;
};

export const lockResume = async ({ id, set }: LockResumeArgs): Promise<Resume> => {
  const updatedResume = await resumeClient.update(id, { locked: set });

  // Update the cache for the specific resume
  queryClient.setQueryData<Resume>([RESUME_KEY, { id }], updatedResume as Resume);

  // Update the cache for the list of resumes
  queryClient.setQueryData<Resume[]>([RESUMES_KEY], (cache) => {
    if (!cache) return [updatedResume as Resume];
    return cache.map((resume) => {
      if (resume.id === id) return updatedResume as Resume;
      return resume;
    });
  });

  return updatedResume as Resume;
};

export const useLockResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: lockResumeFn,
  } = useMutation<Resume, Error, LockResumeArgs>({ // Specify types for useMutation
    mutationFn: lockResume,
    // onSuccess is handled within lockResume function for immediate cache update
  });

  return { lockResume: lockResumeFn, loading, error };
};
