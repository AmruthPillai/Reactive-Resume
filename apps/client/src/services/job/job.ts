import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import _axios, { AxiosResponse } from "axios";

import { JOBS_KEY } from "@/client/constants/query-keys";
import { queryClient } from "@/client/libs/query-client";

const baseInit: RequestInit = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "xc-token": process.env.NX_PUBLIC_NOCODB_TOKEN ?? "",
    "Access-Control-Allow-Origin": "*",
  },
};

export const axios = _axios.create({
  baseURL: "https://app.nocodb.com/api/v2/tables/",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "xc-token": process.env.NX_PUBLIC_NOCODB_TOKEN ?? "",
    "Access-Control-Allow-Origin": "*",
  },
});

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
    baseInit,
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

export type IJobApply = {
  job: IJob | null;
  userId: string;
  coverLetter: string;
  resumes: File[];
};

export const DEFAULT_JOB_APPLY: IJobApply = {
  job: null,
  userId: "",
  coverLetter: "",
  resumes: [],
};

export type InitJobDto = {
  introduce: string;
  cv_ids: string[];
  user_id: string;
};

export type InitJobResponse = {
  Id: string;
};

export const initJopApply = async (data: InitJobDto) => {
  const response = await axios.post<InitJobResponse, AxiosResponse<InitJobResponse>, InitJobDto>(
    `${process.env.NX_PUBLIC_JOB_APPLY_TABLE}/records`,
    data,
  );

  return response.data;
};

export const useInitJobApply = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: initJobApplyFn,
  } = useMutation({
    mutationFn: initJopApply,
    onSuccess: (data) => {
      queryClient.setQueryData<InitJobResponse>(["jobApply", { id: data.Id }], data);
    },
  });

  return { initJobApply: initJobApplyFn, loading, error };
};

export type LinkJobApplyDto = {
  jobId: string;
  jobApplyId: string;
};

export const linkJobApply = async (data: LinkJobApplyDto) => {
  const { jobId, jobApplyId } = data;

  const response = await axios.post(
    `${process.env.NX_PUBLIC_JOB_APPLY_TABLE}/links/${process.env.NX_PUBLIC_JOB_JOB_APPLY_LINK}/records/${jobApplyId}`,
    {
      Id: jobId,
    },
  );

  return response.data;
};

export const useLinkJobApply = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: linkJobApplyFn,
  } = useMutation({
    mutationFn: linkJobApply,
  });

  return { linkJobApply: linkJobApplyFn, loading, error };
};
