"use client";

import { PropertyStatusBadge } from "@/components/application/asset/asset-badges";
import { getUnitById } from "@/components/application/asset/units/actions";
import { ListOfLeases } from "@/components/application/asset/units/lease/list-of-leases";
import Container from "@/components/container";
import { TypographyH1, TypographyH2 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import { assetTypes } from "@/lib/enums";
import { UnitData } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface Props {
  unit: UnitData;
}

export default function PageClient({ unit: initialData }: Props) {
  const query = useQuery({
    queryKey: ["unit", initialData.id],
    queryFn: async () => getUnitById(initialData.id),
    initialData,
  });
  const { data: unit, status } = query;

  if (status === "error") {
    return (
      <ErrorContainer errorMessage="Failed to fetch unit data" query={query} />
    );
  }
  if (!unit) {
    return (
      <EmptyContainer
        title="This unit does not exist, or it has been moved."
        description="Kindly check your url and try again!"
      />
    );
  }
  const {
    name,
    rent,
    status: propertyStatus,
    asset: { type: assetType, name: assetName, id: assetId },
    leases,
  } = unit;
  const { title: assetTitle } = assetTypes[assetType];

  return (
    <Container
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Assets", href: "/assets" },
        { title: assetTitle + "s", href: `/assets/${assetType}` },
        { title: assetName, href: `/assets/${assetType}/${assetId}` },
        { title: `Unit: ${name}` },
      ]}
    >
      <TypographyH1
        text={assetName}
        className="text-muted-foreground uppercase"
      />
      <TypographyH2 text={name} className="flex gap-3 flex-wrap">
        <PropertyStatusBadge
          propertyStatus={propertyStatus}
          className="[&svg]:size-auto"
        />
        <span className="slashed-zero ms-auto font-mono">
          Base Price {formatCurrency(rent || 0)}
        </span>
      </TypographyH2>
      {/* <ol className="list-disc">
        TODO
        {["leases []"].map((field) => (
          <li key={field}>{field}</li>
        ))}
      </ol> */}
      <ListOfLeases leases={leases} unit={unit} />
    </Container>
  );
}
