import { useMutation } from "@tanstack/react-query";
import type { Resume } from "@reactive-resume/schema";

import { RESUME_KEY, RESUMES_KEY } from "@/client/constants/query-keys";
import { resumes as resumeClient } from "@/client/lib/supabase";
import { queryClient } from "@/client/libs/query-client";

export const deleteResume = async (id: string): Promise<void> => {
  await resumeClient.delete(id);
};

export const useDeleteResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: deleteResumeFn,
  } = useMutation<void, Error, string>({ // Specify types for useMutation
    mutationFn: deleteResume,
    onSuccess: (_, id) => { // The first argument is void, the second is the variable passed to mutationFn (the id)
      // Remove the specific resume query from cache
      queryClient.removeQueries({ queryKey: [RESUME_KEY, { id }] });

      // Update the list of resumes in cache
      queryClient.setQueryData<Resume[]>([RESUMES_KEY], (cache) => {
        if (!cache) return [];
        return cache.filter((resume) => resume.id !== id);
      });
    },
  });

  return { deleteResume: deleteResumeFn, loading, error };
};
