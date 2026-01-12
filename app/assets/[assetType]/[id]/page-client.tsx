"use client";

import { getAssetById } from "@/components/asset/action";
import { AssetLegalStatusBadge } from "@/components/asset/asset-badges";
import TabsStructure from "@/components/asset/tabs/tabs-structure";
import Container from "@/components/container";
import { TypographyH1 } from "@/components/headings";
import ErrorContainer from "@/components/query-container/error-container";
import { assetTypes } from "@/lib/enums";
import { AssetData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export default function PageClient({
  initialData,
}: {
  initialData: AssetData;
}) {
  const id = initialData.id;
  const query = useQuery({
    queryKey: ["asset", id],
    queryFn: async () => getAssetById(id),
    initialData,
  });
  const { data, status } = query;

  if (!data) return notFound();
  const { name, type, legalStatus } = data;
  const { title: assetTitle } = assetTypes[type];
  return (
    <Container
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Assets", href: "/assets" },
        { title: assetTitle + "s", href: `/assets/${type}` },
        { title: name },
      ]}
    >
      <div className="flex gap-3">
        <AssetLegalStatusBadge
          className="[&>svg]:size-auto text-lg"
          legalStatus={legalStatus}
        />
        <TypographyH1
          text={`${name.toUpperCase()}: ${assetTitle}`}
          className="line-clamp-2"
        />
      </div>
      {status === "error" ? (
        <ErrorContainer
          errorMessage="An error occurred while fetching asset"
          query={query}
        />
      ) : (
        <TabsStructure asset={data} />
      )}
    </Container>
  );
}
