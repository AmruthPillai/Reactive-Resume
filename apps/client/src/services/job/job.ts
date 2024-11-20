import { useQuery } from "@tanstack/react-query";

import { JOBS_KEY } from "@/client/constants/query-keys";

// process.env.GENAI_API_KEY ?? ""

export type IJob = {
  Id: number;
  title: string;
  job_code: string;
  description: string;
  status: string;
  CreatedAt: string;
  UpdatedAt: string;
  _nc_m2m_job_apply_jobs: unknown[];
  job_applies: number;
};

export const fetchJobs = async (): Promise<IJob[]> => {
  const response = await fetch(
    `https://app.nocodb.com/api/v2/tables/${import.meta.env.VITE_JOB_TABLE ?? ""}/records?viewId=${import.meta.env.VITE_JOB_VIEW_1 ?? ""}&where=%28status%2Ceq%2Copen%29&limit=25&shuffle=0&offset=0`,
    {
      // mode: "no-cors",
      headers: {
        Accept: "application/json",
        "xc-token": import.meta.env.VITE_NOCODB_TOKEN,
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
  const json = await response.json();
  return json.list;
};

export const useJobs = () => {
  const {
    error,
    isPending: loading,
    data: jobs,
  } = useQuery({
    queryKey: JOBS_KEY,
    queryFn: fetchJobs,
  });

  return { jobs, loading, error };
};
