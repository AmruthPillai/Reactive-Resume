import { useQuery } from "@tanstack/react-query";
import type { Resume } from "@reactive-resume/schema";

import { RESUMES_KEY } from "@/client/constants/query-keys";
import { resumes as resumeClient } from "@/client/lib/supabase";

export const fetchResumes = async (): Promise<Resume[]> => {
  const data = await resumeClient.list();
  // Ensure the returned data matches the expected Resume[] type
  // Supabase might return slightly different structure, adjust if needed
  return data as Resume[];
};

export const useResumes = () => {
  const {
    error,
    isPending: loading,
    data: resumes,
  } = useQuery<Resume[], Error>({ // Specify types for useQuery
    queryKey: RESUMES_KEY,
    queryFn: fetchResumes,
  });

  return { resumes, loading, error };
};
