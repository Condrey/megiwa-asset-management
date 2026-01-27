"use client";

import { getLeaseById } from "@/components/application/asset/units/lease/actions";
import ButtonAddEditInvoice from "@/components/application/asset/units/lease/tenant/invoice/button-add-edit-invoice";
import { ListOfInvoices } from "@/components/application/asset/units/lease/tenant/invoice/list-of-invoices";
import Container from "@/components/container";
import { TypographyH2 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { assetTypes } from "@/lib/enums";
import { LeaseData } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { PlusIcon } from "lucide-react";

interface Props {
  lease: LeaseData;
}

export default function PageClient({ lease: initialData }: Props) {
  const query = useQuery({
    queryKey: ["lease", initialData.id],
    queryFn: async () => getLeaseById(initialData.id),
    initialData,
  });
  const { data: lease, status } = query;

  if (status === "error") {
    return (
      <ErrorContainer errorMessage="Failed to fetch lease data" query={query} />
    );
  }
  if (!lease) {
    return (
      <EmptyContainer
        title="This lease does not exist, or it has been moved."
        description="Kindly check your url and try again!"
      />
    );
  }
  const {
    id: leaseId,
    rent,
    startDate,
    endDate,
    unit: {
      rent: unitRent,
      name: unitName,
      id: unitId,
      status: unitStatus,
      asset: { type: assetType, name: assetName, id: assetId },
    },
    invoices,
  } = lease;
  const { title: assetTitle } = assetTypes[assetType];
  const isSameRentAmount = unitRent === rent;

  return (
    <Container
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Assets", href: "/assets" },
        { title: assetTitle + "s", href: `/assets/${assetType}` },
        { title: assetName, href: `/assets/${assetType}/${assetId}` },
        {
          title: `unit: ${unitName}`,
          href: `/assets/${assetType}/${assetId}/unit/${unitId}`,
        },
        { title: `Lease: ${leaseId}` },
      ]}
    >
      <Item className="p-0">
        <ItemContent>
          <ItemTitle>Lease information</ItemTitle>
          <ItemDescription>{`id: ${leaseId}`}</ItemDescription>
          <ItemDescription>{`${formatDate(startDate, "PPP")} ${endDate ? ` - ${formatDate(startDate, "PPP")}` : ""}`}</ItemDescription>
        </ItemContent>
      </Item>
      <TypographyH2
        text={unitName}
        className="flex gap-3 flex-wrap w-full justify-between"
      >
        <p className="slashed-zero font-mono space-x-2">
          Lease price{" "}
          <span
            className={cn(
              !isSameRentAmount && "line-through text-muted-foreground",
            )}
          >
            {formatCurrency(unitRent || 0, "Ugx", true)}
          </span>
          {!isSameRentAmount && (
            <span className="slashed-zero">
              {formatCurrency(rent, "Ugx", true)}
            </span>
          )}
        </p>
        <ButtonAddEditInvoice lease={lease}>
          <PlusIcon /> Invoice
        </ButtonAddEditInvoice>
      </TypographyH2>
      <ListOfInvoices invoices={invoices} lease={lease} className="h-dvh" />
    </Container>
  );
}
