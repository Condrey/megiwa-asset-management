"use client";
import { ValuationData } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertValuation } from "./actions";

export function useUpsertValuationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertValuation,
    async onSuccess(data, variables) {
      const queryKey: QueryKey = ["valuations", variables.id];
      const queryKey2: QueryKey = ["asset", variables.assetId];
      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<ValuationData[]>(queryKey, (oldData) => {
        if (!oldData) return;
        if (!variables.id) {
          return [data, ...oldData];
        } else {
          return oldData.map((d) => (d.id === data.id ? data : d));
        }
      });
      queryClient.invalidateQueries({ queryKey: queryKey2 });
      toast.success("success", {
        description: !variables.id ? "Valuation added" : "Valuation updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate valuation");
    },
  });
}
