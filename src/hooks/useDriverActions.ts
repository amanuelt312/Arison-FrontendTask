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
