import { useQuery } from "@tanstack/react-query";
import { getAllAssetOwnerships } from "./actions";

export function useAllAssetOwnershipsQuery(assetId: string) {
  return useQuery({
    queryKey: ["ownerships", assetId],
    queryFn: async () => getAllAssetOwnerships(assetId),
  });
}
