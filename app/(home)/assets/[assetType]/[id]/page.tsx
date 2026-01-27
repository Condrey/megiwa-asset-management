import { getAssetById } from "@/components/application/asset/action";
import {
  ASSET_SEARCH_PARAMETER,
  FINANCE_SEARCH_PARAMETER,
} from "@/lib/constants";
import { assetTypes } from "@/lib/enums";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PageClient from "./page-client";

interface Props {
  params: Promise<{ id: string }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: Promise<any>;
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const _searchParams = await searchParams;
  const assetSearchParams =
    (_searchParams[ASSET_SEARCH_PARAMETER] as string) || "details";
  const financeSearchParams =
    (_searchParams[FINANCE_SEARCH_PARAMETER] as string) || "incomes";

  const assetId = decodeURIComponent(id);
  const asset = await getAssetById(assetId);
  if (!asset)
    return {
      title: "Asset Not Found",
      description: "The item you are looking for does not exist.",
    };
  const { title: assetTitle } = assetTypes[asset.type];

  return {
    title: `${assetSearchParams === "finances" ? `${financeSearchParams.toUpperCase()}: ` : ""}${assetSearchParams.toUpperCase()} of ${asset.name} - Asset`,
    description: `${asset.name} is a ${assetTitle} located at ${asset.location}. ${asset.size && `It has a size of ${asset.size}`}`,
  };
}

export default async function Page({ params }: Props) {
  const { id: paramsId } = await params;
  const assetId = decodeURIComponent(paramsId);
  const asset = await getAssetById(assetId);
  if (!asset) return notFound();

  return <PageClient initialData={asset} />;
}
