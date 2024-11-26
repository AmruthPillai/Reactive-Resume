import { useQuery } from "@tanstack/react-query";

import { TECH_STACK_KEY } from "@/client/constants/query-keys";

export type ITechStack = {
  Id: number;
  title: string;
  slug: string;
  job: number;
};

export const fetchTechStacks = async (): Promise<ITechStack[]> => {
  const response = await fetch(
    `https://app.nocodb.com/api/v2/tables/${process.env.NX_PUBLIC_TECH_STACK_TABLE}/records?viewId=${process.env.NX_PUBLIC_TECH_STACK_VIEW_1}&limit=25&shuffle=0&offset=0`,
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

export const useTechStacks = () => {
  const {
    error,
    isPending: loading,
    data: techStacks,
  } = useQuery({
    queryKey: TECH_STACK_KEY,
    queryFn: fetchTechStacks,
  });

  return { techStacks, loading, error };
};
