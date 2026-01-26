"use client";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertTenant } from "./actions";

export function useUpsertTenantMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertTenant,
    async onSuccess(data, variables) {
      const queryKey: QueryKey = ["tenant", variables.id];
      const queryKey2: QueryKey = ["tenants"];
      await queryClient.cancelQueries({ queryKey });
      await queryClient.cancelQueries({ queryKey: queryKey2 });
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: queryKey2 });
      toast.success("success", {
        description: !variables.id ? "Tenant added" : "Tenant updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate tenant");
    },
  });
}
