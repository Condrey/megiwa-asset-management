"use client";
import { UserDataSelect } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { insertManager } from "./action";

const queryKey: QueryKey = ["managers"];

export function useInsertManagerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertManager,
    async onSuccess(data) {
      await queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData<UserDataSelect[]>(queryKey, (oldData) => {
        if (!oldData) return;
        if (typeof data === "string") {
          toast.warning(data);
          return;
        } else {
          toast.success("Manager added success fully");
          return [data, ...oldData];
        }
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate management");
    },
  });
}
