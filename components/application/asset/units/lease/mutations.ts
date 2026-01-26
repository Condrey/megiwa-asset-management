"use client";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertLease } from "./actions";

export function useUpsertLeaseMutation(assetId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertLease,
    async onSuccess(data, variables) {
      const queryKey: QueryKey = ["lease", variables.id];
      const queryKey2: QueryKey = ["asset", assetId];
      const queryKey3: QueryKey = ["leases", "unit", variables.unitId];
      await queryClient.cancelQueries({ queryKey });
      await queryClient.cancelQueries({ queryKey: queryKey2 });
      await queryClient.cancelQueries({ queryKey: queryKey3 });
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: queryKey2 });
      queryClient.invalidateQueries({ queryKey: queryKey3 });
      toast.success("success", {
        description: !variables.id ? "Lease added" : "Lease updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate lease");
    },
  });
}
