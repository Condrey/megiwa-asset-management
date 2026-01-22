import { getGroupedAssetsByType } from "@/components/application/asset/action";
import Container from "@/components/container";
import { TypographyH1 } from "@/components/headings";
import { Metadata } from "next";
import PageClient from "./page-client";

export const metadata: Metadata = {
  title: "All assets by group",
};

export default async function Page() {
  const assets = await getGroupedAssetsByType();
  return (
    <Container
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Assets", href: "/assets" },
      ]}
      ITEMS_TO_DISPLAY={2}
    >
      <TypographyH1 text="Grouped assets by type" className="uppercase" />
      <PageClient assets={assets} />
    </Container>
  );
}
