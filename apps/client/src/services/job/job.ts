import { useQuery } from "@tanstack/react-query";

import { JOBS_KEY } from "@/client/constants/query-keys";

// process.env.GENAI_API_KEY ?? ""

type AnyObject = Record<string, string>;

export type IJob = {
  Id: number;
  title: string;
  job_code: string;
  description: string;
  status: string;
  CreatedAt: string;
  UpdatedAt: string;
  _nc_m2m_job_apply_jobs: unknown[];
  _nc_m2m_job_tech_stacks: AnyObject[];
  job_applies: number;
};

export const defaultJob: IJob = {
  Id: 0,
  title: "",
  job_code: "",
  description: "",
  status: "",
  CreatedAt: "",
  UpdatedAt: "",
  _nc_m2m_job_apply_jobs: [],
  _nc_m2m_job_tech_stacks: [],
  job_applies: 0,
};

export const fetchJobs = async (): Promise<IJob[]> => {
  const response = await fetch(
    `https://app.nocodb.com/api/v2/tables/${process.env.NX_PUBLIC_JOB_TABLE}/records?viewId=${process.env.NX_PUBLIC_JOB_VIEW_1}&where=%28status%2Ceq%2Copen%29&limit=25&shuffle=0&offset=0`,
    {
      // mode: "no-cors",
      headers: {
        Accept: "application/json",
        "xc-token": process.env.NX_PUBLIC_NOCODB_TOKEN ?? "",
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
