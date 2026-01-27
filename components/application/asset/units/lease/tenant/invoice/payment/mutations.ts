"use client";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertPayment } from "./actions";

export function useUpsertPaymentMutation(leaseId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertPayment,
    async onSuccess(data, variables) {
      const queryKey: QueryKey = ["payment", variables.id];
      const queryKey2: QueryKey = ["unit"];
      const queryKey3: QueryKey = ["leases", "unit"];
      const queryKey4: QueryKey = ["invoices", "lease", leaseId];
      const queryKey5: QueryKey = ["payments", "invoice", variables.invoiceId];
      await queryClient.cancelQueries({ queryKey });
      await queryClient.cancelQueries({ queryKey: queryKey2 });
      await queryClient.cancelQueries({ queryKey: queryKey3 });
      await queryClient.cancelQueries({ queryKey: queryKey4 });
      await queryClient.cancelQueries({ queryKey: queryKey5 });
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: queryKey2 });
      queryClient.invalidateQueries({ queryKey: queryKey3 });
      queryClient.invalidateQueries({ queryKey: queryKey4 });
      queryClient.invalidateQueries({ queryKey: queryKey5 });
      toast.success("success", {
        description: !variables.id ? "Payment added" : "Payment updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate payment");
    },
  });
}
