"use client";
import { AssetType } from "@/lib/generated/prisma/enums";
import { AssetData } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { upsertAsset } from "./action";

export function useUpsertAssetMutation(assetType?: AssetType) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertAsset,
    async onSuccess(data, variables) {
      const queryKey: QueryKey = ["assets"];
      const queryKey2: QueryKey = ["assets", "grouped-by-type"];
      const queryKey3: QueryKey = ["assets", "by-type", assetType];

      await queryClient.cancelQueries({ queryKey });
      await queryClient.cancelQueries({ queryKey: queryKey2 });
      await queryClient.cancelQueries({ queryKey: queryKey3 });

      queryClient.setQueryData<AssetData[]>(queryKey, (oldData) => {
        if (!oldData) return;
        if (!variables.id) {
          return [data, ...oldData];
        } else {
          return oldData.map((d) => (d.id === data.id ? data : d));
        }
      });
      queryClient.invalidateQueries({ queryKey: queryKey2 });
      queryClient.invalidateQueries({ queryKey: queryKey3 });
      toast.success("success", {
        description: !variables.id ? "Asset added" : "Asset updated",
      });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to manipulate asset");
    },
  });
}
