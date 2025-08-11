import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import type { UsersListResponse } from "../types/users";

export function useUserSummary() {
  return useQuery({
    queryKey: ["userSummary", { role: "driver" }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: "1",
        limit: "1",
      });
      const res = await apiFetch<UsersListResponse>(
        `/api/v1/admin/users?${params.toString()}`
      );
      return res.data.filters?.summary;
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
