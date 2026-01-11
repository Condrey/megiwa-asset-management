"use client";
import { InheritanceBeneficiaryData } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertInheritanceBeneficiary } from "./actions";

export function useUpsertInheritanceBeneficiaryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertInheritanceBeneficiary,
    async onSuccess(data, variables) {
      const queryKey: QueryKey = ["inheritanceBeneficiaries"];
      const queryKey2: QueryKey = ["asset"];
      const queryKey3: QueryKey = ["ownerships"];
      const queryKey4: QueryKey = ["familyMembers"];
      const queryKey5: QueryKey = ["inheritanceEvent", variables.eventId];
      await queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData<InheritanceBeneficiaryData[]>(
        queryKey,
        (oldData) => {
          if (!oldData) return;
          if (!variables.id) {
            return [data, ...oldData];
          } else {
            return oldData.map((d) => (d.id === data.id ? data : d));
          }
        }
      );
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: queryKey2 });
      queryClient.invalidateQueries({ queryKey: queryKey3 });
      queryClient.invalidateQueries({ queryKey: queryKey4 });
      queryClient.invalidateQueries({ queryKey: queryKey5 });
      toast.success("success", {
        description: !variables.id
          ? "Beneficiary added"
          : "Beneficiary updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate inheritance beneficiary");
    },
  });
}
