"use client";
import { InheritanceEventData } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertInheritanceEvent } from "./actions";

const queryKey: QueryKey = ["inheritanceEvents"];

export function useUpsertInheritanceEventMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertInheritanceEvent,
    async onSuccess(data, variables) {
      const queryKey2: QueryKey = ["asset", variables.assetId];
      const queryKey3: QueryKey = ["ownerships"];
      const queryKey4: QueryKey = ["familyMembers"];
      await queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData<InheritanceEventData[]>(queryKey, (oldData) => {
        if (!oldData) return;
        if (!variables.id) {
          return [data, ...oldData];
        } else {
          return oldData.map((d) => (d.id === data.id ? data : d));
        }
      });
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: queryKey2 });
      queryClient.invalidateQueries({ queryKey: queryKey3 });
      queryClient.invalidateQueries({ queryKey: queryKey4 });
      toast.success("success", {
        description: !variables.id ? "Event added" : "Event updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate inheritance event");
    },
  });
}
