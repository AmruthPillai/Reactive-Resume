import { useMutation } from "@tanstack/react-query";
import type { Resume, Database } from "@reactive-resume/schema";

import { RESUME_KEY, RESUMES_KEY } from "@/client/constants/query-keys";
import { resumes as resumeClient } from "@/client/lib/supabase";
import { queryClient } from "@/client/libs/query-client";

// Define the input type based on Supabase schema
type CreateResumeInput = Database["public"]["Tables"]["resumes"]["Insert"];

export const createResume = async (data: CreateResumeInput): Promise<Resume> => {
  const response = await resumeClient.create(data);
  return response as Resume;
};

export const useCreateResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: createResumeFn,
  } = useMutation<Resume, Error, CreateResumeInput>({ // Specify types for useMutation
    mutationFn: createResume,
    onSuccess: (data) => {
      // Update the cache for the specific resume
      queryClient.setQueryData<Resume>([RESUME_KEY, { id: data.id }], data);

      // Update the cache for the list of resumes
      queryClient.setQueryData<Resume[]>([RESUMES_KEY], (cache) => {
        if (!cache) return [data];
        // Add the new resume to the beginning of the list
        return [data, ...cache];
      });
    },
  });

  return { createResume: createResumeFn, loading, error };
};
