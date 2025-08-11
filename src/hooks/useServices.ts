import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import type { ServicesResponse } from "../types/services";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await apiFetch<ServicesResponse>(`/api/v1/services`);
      return res.data;
    },
    staleTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });
}
