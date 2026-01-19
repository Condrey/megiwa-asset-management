"use client";

import { FamilyMemberData } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertFamilyMember } from "./actions";

const queryKey: QueryKey = ["familyMembers"];

export function useUpsertFamilyMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertFamilyMember,
    async onSuccess(data, variables) {
      await queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData<FamilyMemberData[]>(queryKey, (oldData) => {
        if (!oldData) return;
        if (!variables.id) {
          return [data, ...oldData];
        } else {
          return oldData.map((d) => (d.id === data.id ? data : d));
        }
      });
      toast.success("success", {
        description: !variables.id ? "Member added" : "Member updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate family member");
    },
  });
}
