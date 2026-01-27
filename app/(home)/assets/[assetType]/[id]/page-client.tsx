"use client";

import { getAssetById } from "@/components/application/asset/action";
import {
  AssetLegalStatusBadge,
  AssetTypeBadge,
} from "@/components/application/asset/asset-badges";
import TabsStructure from "@/components/application/asset/tabs/tabs-structure";
import Container from "@/components/container";
import { TypographyH1 } from "@/components/headings";
import ErrorContainer from "@/components/query-container/error-container";
import { assetTypes } from "@/lib/enums";
import { AssetData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
      <div className="flex flex-col items-start">
        <TypographyH1 text={name} className="line-clamp-2 uppercase" />
        <div className="flex gap-3">
          <AssetLegalStatusBadge
            className="[&>svg]:size-5 text-sm flex-wrap py-0"
            legalStatus={legalStatus}
          />
          <AssetTypeBadge
            type={type}
            className="[&>svg]:size-5 text-sm flex-wrap py-0"
          />
        </div>
      </div>

      {status === "error" ? (
        <ErrorContainer
          errorMessage="An error occurred while fetching asset"
          query={query}
        />
      ) : (
        <Suspense>
          <TabsStructure asset={data} />
        </Suspense>
      )}
    </Container>
  );
}
