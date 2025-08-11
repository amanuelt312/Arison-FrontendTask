import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import type { UserDetailResponse } from "../types/userDetail";

export function useDriverDetail(userId: string | undefined) {
  return useQuery({
    queryKey: ["driverDetail", userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await apiFetch<UserDetailResponse>(
        `/api/v1/admin/users/${userId}`
      );
      return res.data;
    },
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}
