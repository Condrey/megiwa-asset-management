import { getAssetsByType } from "@/components/application/asset/action";
import Container from "@/components/container";
import { TypographyH1 } from "@/components/headings";
import { assetTypes } from "@/lib/enums";
import { AssetType } from "@/lib/generated/prisma/enums";
import { Metadata } from "next";
import PageClient from "./page-client";

interface Props {
  params: Promise<{ assetType: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { assetType } = await params;
  const type = decodeURIComponent(assetType) as AssetType;
  const { title } = assetTypes[type];
  return {
    title: `${title}s - Assets`,
  };
}

export default async function Page({ params }: Props) {
  const { assetType } = await params;
  const type = decodeURIComponent(assetType) as AssetType;
  const assets = await getAssetsByType(type);
  const { title } = assetTypes[type];

  return (
    <Container
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Assets", href: "/assets" },
        { title: title + "s" },
      ]}
    >
      <TypographyH1 text={title + "s"} className="uppercase" />
      <PageClient assets={assets} assetType={type} />
    </Container>
  );
}
