import { getAssetsByType } from "@/components/asset/action";
import AssetItem from "@/components/asset/asset-item";
import Container from "@/components/container";
import { TypographyH1 } from "@/components/headings";
import { assetTypes } from "@/lib/enums";
import { AssetType } from "@/lib/generated/prisma/enums";
import { Metadata } from "next";

interface Props {
  params: Promise<{ assetType: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { assetType } = await params;
  const type = decodeURIComponent(assetType) as AssetType;
  const { title } = assetTypes[type];
  return {
    title: `${title} - Assets`,
  };
}

export default async function Page({ params }: Props) {
  const { assetType } = await params;
  const type = decodeURIComponent(assetType) as AssetType;
  const assets = await getAssetsByType(type);
  const { title } = assetTypes[type];
  const count = assets.length;

  return (
    <Container
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Assets", href: "/assets" },
        { title: title + "s" },
      ]}
    >
      <TypographyH1 text={title + "s"} className="uppercase" />
      <p>{`${count} ${title}${count === 1 ? "" : "s"}`}</p>
      <div className="grid sm:grid-cols-2 gap-6">
        {assets.map((asset, index) => (
          <AssetItem key={index} asset={asset} />
        ))}
      </div>
    </Container>
  );
}
