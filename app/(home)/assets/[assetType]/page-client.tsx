"use client";
import { getAssetsByType } from "@/components/application/asset/action";
import AssetItem from "@/components/application/asset/asset-item";
import ButtonAddEditAsset from "@/components/application/asset/button-add-edit-asset";
import { TypographyH2 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import { assetTypes } from "@/lib/enums";
import { Asset } from "@/lib/generated/prisma/client";
import { AssetType } from "@/lib/generated/prisma/enums";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";

interface Props {
  assets: Asset[];
  assetType: AssetType;
}
export default function PageClient({ assets: initialData, assetType }: Props) {
  const { title } = assetTypes[assetType];

  const query = useQuery({
    queryKey: ["assets", "by-type", assetType],
    queryFn: async () => getAssetsByType(assetType),
    initialData,
  });
  const { status, data: assets } = query;

  const count = assets.length;

  return (
    <>
      <TypographyH2
        text={`${count} ${title}${count === 1 ? "" : "s"}`}
        className="flex justify-between gap-3 "
      >
        <ButtonAddEditAsset assetType={assetType}>
          <PlusIcon /> Add Asset
        </ButtonAddEditAsset>
      </TypographyH2>
      {status === "error" ? (
        <ErrorContainer
          errorMessage={`Failed to fetch ${title} assets`}
          query={query}
        />
      ) : status === "success" && !assets.length ? (
        <EmptyContainer
          title={`Database has no ${title} assets`}
          description={`Start by adding a new ${title} asset to the database using the button below.`}
        >
          <ButtonAddEditAsset assetType={assetType}>
            <PlusIcon /> New asset
          </ButtonAddEditAsset>
        </EmptyContainer>
      ) : (
        <Suspense>
          <div className="grid sm:grid-cols-2 gap-6">
            {assets.map((asset, index) => (
              <AssetItem key={index} asset={asset} />
            ))}
          </div>
        </Suspense>
      )}
    </>
  );
}
