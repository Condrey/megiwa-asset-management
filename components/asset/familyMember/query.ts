import { useQuery } from "@tanstack/react-query";
import { getAllFamilyMembers, getAllFamilyMembersOwningAsset } from "./actions";

export function useFamilyMembersQuery() {
  return useQuery({
    queryKey: ["familyMembers"],
    queryFn: getAllFamilyMembers,
  });
}

export const useFamilyMembersOwningAssetQuery = (assetId: string) =>
  useQuery({
    queryKey: ["familyMembers", "owningAsset", assetId],
    queryFn: async () => getAllFamilyMembersOwningAsset(assetId),
  });
