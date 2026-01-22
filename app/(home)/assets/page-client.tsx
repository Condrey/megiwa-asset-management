"use client";
import { getGroupedAssetsByType } from "@/components/application/asset/action";
import ButtonAddEditAsset from "@/components/application/asset/button-add-edit-asset";
import { GroupedAssetItem } from "@/components/application/asset/grouped-asset-item";
import { TypographyH2 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import {
  AssetGroupByOutputType,
  PickEnumerable,
} from "@/lib/generated/prisma/internal/prismaNamespace";
import {} from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";

interface Props {
  assets: (PickEnumerable<AssetGroupByOutputType, "type"> & {
    _count: {
      type: number;
      _all: number;
    };
  })[];
}
export default function PageClient({ assets: initialData }: Props) {
  const query = useQuery({
    queryKey: ["assets", "grouped-by-type"],
    queryFn: getGroupedAssetsByType,
    initialData,
  });
  const { status, data: assets } = query;

  const count = assets.length;

  return (
    <>
      <TypographyH2
        text={`${count} grouped asset type${count === 1 ? "" : "s"}`}
        className="flex justify-between gap-3 "
      >
        <ButtonAddEditAsset>
          <PlusIcon /> Add Asset
        </ButtonAddEditAsset>
      </TypographyH2>
      {status === "error" ? (
        <ErrorContainer
          errorMessage="Failed to fetch grouped assets"
          query={query}
        />
      ) : status === "success" && !assets.length ? (
        <EmptyContainer
          title="Database has no assets"
          description="You have not added any asset to the database yet. Please use the button below to add an asset"
        >
          <ButtonAddEditAsset>
            <PlusIcon /> Add an asset
          </ButtonAddEditAsset>
        </EmptyContainer>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {assets.map((groupedAssetItem, index) => {
            return (
              <GroupedAssetItem
                key={index}
                groupedAssetItem={groupedAssetItem}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
