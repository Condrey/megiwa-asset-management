"use client";
import { UnitData } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertUnit } from "./actions";

export function useUpsertUnitMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertUnit,
    async onSuccess(data, variables) {
      const queryKey: QueryKey = ["units", variables.id];
      const queryKey2: QueryKey = ["asset", variables.assetId];
      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<UnitData[]>(queryKey, (oldData) => {
        if (!oldData) return;
        if (!variables.id) {
          return [data, ...oldData];
        } else {
          return oldData.map((d) => (d.id === data.id ? data : d));
        }
      });
      queryClient.invalidateQueries({ queryKey: queryKey2 });
      toast.success("success", {
        description: !variables.id ? "Unit added" : "Unit updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate unit");
    },
  });
}
