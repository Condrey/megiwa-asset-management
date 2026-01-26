"use client";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertInvoice } from "./actions";

export function useUpsertInvoiceMutation(unitId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertInvoice,
    async onSuccess(data, variables) {
      const queryKey: QueryKey = ["invoice", variables.id];
      const queryKey2: QueryKey = ["unit", unitId];
      const queryKey3: QueryKey = ["leases", "unit", unitId];
      const queryKey4: QueryKey = ["invoices", "lease", variables.leaseId];
      await queryClient.cancelQueries({ queryKey });
      await queryClient.cancelQueries({ queryKey: queryKey2 });
      await queryClient.cancelQueries({ queryKey: queryKey3 });
      await queryClient.cancelQueries({ queryKey: queryKey4 });
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: queryKey2 });
      queryClient.invalidateQueries({ queryKey: queryKey3 });
      queryClient.invalidateQueries({ queryKey: queryKey4 });
      toast.success("success", {
        description: !variables.id ? "Invoice added" : "Invoice updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate invoice");
    },
  });
}
