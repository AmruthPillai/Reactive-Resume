import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

export type SessionRow = {
  id: string;
  userAgent?: string;
  ip?: string;
  createdAt: string | Date;
  lastUsedAt: string | Date;
};

export const fetchSessions = async () => {
  const { data } = await axios.get<{ sessions: SessionRow[] }>("/account/sessions");
  return data.sessions;
};

export const useSessions = () => useQuery({ queryKey: ["account", "sessions"], queryFn: fetchSessions });

export const useRevokeSession = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/account/sessions/${id}`);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["account", "sessions"] });
    },
  });
};

