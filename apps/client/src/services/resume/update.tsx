import { useMutation } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import type { Resume, Database } from "@reactive-resume/schema";

import { RESUME_KEY, RESUMES_KEY } from "@/client/constants/query-keys";
import { resumes as resumeClient } from "@/client/lib/supabase";
import { queryClient } from "@/client/libs/query-client";

// Define the input type based on Supabase schema
type UpdateResumeInput = Database["public"]["Tables"]["resumes"]["Update"] & { id: string };

export const updateResume = async (data: UpdateResumeInput): Promise<Resume> => {
  const { id, ...updateData } = data;
  const updatedResume = await resumeClient.update(id, updateData);

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

// Keep the debounced version
export const debouncedUpdateResume = debounce(updateResume, 500);

export const useUpdateResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updateResumeFn,
  } = useMutation<Resume, Error, UpdateResumeInput>({ // Specify types for useMutation
    mutationFn: updateResume,
    // onSuccess is handled within updateResume function for immediate cache update
  });

  return { updateResume: updateResumeFn, loading, error };
};
