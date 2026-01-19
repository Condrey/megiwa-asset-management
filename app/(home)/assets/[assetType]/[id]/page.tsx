import { getAssetById } from "@/components/application/asset/action";
import { assetTypes } from "@/lib/enums";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PageClient from "./page-client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const assetId = decodeURIComponent(id);
  const asset = await getAssetById(assetId);
  if (!asset)
    return {
      title: "Asset Not Found",
      description: "The item you are looking for does not exist.",
    };
  const { title: assetTitle } = assetTypes[asset.type];

  return {
    title: `${asset.name} - Asset`,
    description: `${assetTitle} located at ${asset.location}. ${asset.size && `It has a size of ${asset.size}`}`,
  };
}

export default async function Page({ params }: Props) {
  const { id: paramsId } = await params;
  const assetId = decodeURIComponent(paramsId);
  const asset = await getAssetById(assetId);
  if (!asset) return notFound();

  return <PageClient initialData={asset} />;
}
