import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import type { UsersListResponse } from "../types/users";

export type DriversQueryParams = {
  page: number;
  limit: number;
  sortBy?: string; // createdAt
  sortOrder?: "asc" | "desc";
  search?: string; // client-side filter by name/mobile/id
  serviceLevelId?: string; // service id
};

export function useDrivers({
  page,
  limit,
  sortBy = "createdAt",
  sortOrder = "desc",
  serviceLevelId,
}: DriversQueryParams) {
  return useQuery({
    queryKey: ["drivers", { page, limit, sortBy, sortOrder, serviceLevelId }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        role: "driver",
        sortBy,
        sortOrder,
      });
      if (serviceLevelId && serviceLevelId !== "all") {
        params.set("serviceLevel", serviceLevelId);
      }
      const res = await apiFetch<UsersListResponse>(
        `/api/v1/admin/users?${params.toString()}`
      );
      return res.data;
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
