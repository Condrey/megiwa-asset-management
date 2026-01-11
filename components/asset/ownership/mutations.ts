"use client";
import { AssetData, OwnershipData } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { toast } from "sonner";
import { endOwnership, upsertOwnership } from "./actions";

export function useUpsertOwnershipMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertOwnership,
    async onSuccess(data, variables) {
      const queryKey: QueryKey = ["ownerships", variables.assetId];
      const queryKey2: QueryKey = ["asset", variables.assetId];
      await queryClient.cancelQueries({ queryKey });
      await queryClient.cancelQueries({ queryKey: queryKey2 });
      queryClient.setQueryData<OwnershipData[]>(queryKey, (oldData) => {
        if (!oldData) return;
        if (!variables.id) {
          return [data, ...oldData];
        } else {
          return oldData.map((d) => (d.id === data.id ? data : d));
        }
      });
      queryClient.setQueryData<AssetData>(queryKey2, (oldData) => {
        if (!oldData) return;
        if (!variables.id) {
          return { ...oldData, ownerships: [data, ...oldData.ownerships] };
        } else {
          return {
            ...oldData,
            ownerships: oldData.ownerships.map((d) =>
              d.id === data.id ? data : d
            ),
          };
        }
      });
      toast.success("success", {
        description: !variables.id ? "Ownership added" : "Ownership updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate ownership");
    },
  });
}

export function useEndOwnershipMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: endOwnership,
    async onSuccess(data, variables) {
      const queryKey: QueryKey = ["ownerships", variables.assetId];
      const queryKey2: QueryKey = ["asset", variables.assetId];
      await queryClient.cancelQueries({ queryKey });
      await queryClient.cancelQueries({ queryKey: queryKey2 });
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: queryKey2 });
      toast.success("success", {
        description: `Ownership ended on ${formatDate(data.endDate!, "PPP")} for ${data.member.fullName}`,
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to end ownership");
    },
  });
}
