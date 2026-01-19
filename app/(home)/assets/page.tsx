import { getGroupedAssetsByType } from "@/components/application/asset/action";
import { GroupedAssetItem } from "@/components/application/asset/grouped-asset-item";
import Container from "@/components/container";
import { TypographyH1 } from "@/components/headings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All assets by group",
};

export default async function Page() {
  const assets = await getGroupedAssetsByType();
  const count = assets.length;
  return (
    <Container
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Assets", href: "/assets" },
      ]}
      ITEMS_TO_DISPLAY={2}
    >
      <TypographyH1 text="Grouped assets by type" className="uppercase" />
      <p>{`${count} grouped asset type${count === 1 ? "" : "s"}`}</p>
      <div className="grid sm:grid-cols-2 gap-6">
        {assets.map((groupedAssetItem, index) => {
          return (
            <GroupedAssetItem key={index} groupedAssetItem={groupedAssetItem} />
          );
        })}
      </div>
    </Container>
  );
}
