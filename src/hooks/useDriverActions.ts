import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

export function useSuspendUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      userId: string;
      reason: string;
      duration: number;
      suspensionType: "temporary" | "permanent";
    }) => {
      const { userId, ...body } = payload;
      return apiFetch(`/api/v1/admin/users/${userId}/suspend`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}

export function useActivateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { userId: string; reason: string }) => {
      const { userId, ...body } = payload;
      return apiFetch(`/api/v1/admin/users/${userId}/activate`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}

export function useApproveDriver() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ driverId }: { driverId: string }) => {
      return apiFetch(`/api/v1/admin/drivers/${driverId}/approve`, {
        method: "PATCH",
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingDrivers"] });
      qc.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}

export function useRejectDriver() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      driverId,
      reason,
    }: {
      driverId: string;
      reason?: string;
    }) => {
      return apiFetch(`/api/v1/admin/drivers/${driverId}/reject`, {
        method: "PATCH",
        body: reason ? JSON.stringify({ reason }) : undefined,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingDrivers"] });
      qc.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}
