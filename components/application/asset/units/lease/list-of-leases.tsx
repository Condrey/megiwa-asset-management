"use client";
import { DataTable } from "@/components/data-table/data-table";
import { TypographyH3 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import { LeaseData, UnitData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { MapPinIcon, PlusIcon } from "lucide-react";
import { getAllUnitLeases } from "./actions";
import ButtonAddEditLease from "./button-add-edit-lease";
import { useLeaseColumns } from "./columns";
import { Suspense } from "react";
interface Props {
  leases: LeaseData[];
  unit: UnitData;
}
export function ListOfLeases({ leases: initialData, unit }: Props) {
  const {
    asset: { name: assetName, location: assetLocation },
  } = unit;
  const query = useQuery({
    queryKey: ["leases", "unit", unit.id],
    queryFn: async () => getAllUnitLeases(unit.id),
    initialData,
  });
  const { status, data: leases } = query;
  if (status === "error") {
    return (
      <ErrorContainer
        errorMessage="Failed to get leases for this unit"
        query={query}
      />
    );
  }
  if (!leases.length) {
    return (
      <EmptyContainer
        title="No lease found"
        description="Start by leasing the unit using this button"
      >
        <ButtonAddEditLease unit={unit} variant={"secondary"}>
          Add Lease
        </ButtonAddEditLease>
      </EmptyContainer>
    );
  }
  return (
    <Suspense>
      <DataTable
        data={leases}
        columns={useLeaseColumns}
        filterColumn={{ id: "tenant_fullName", label: "tenant name" }}
        className="w-full"
        tableHeaderSection={
          <div>
            <TypographyH3 text={`Leases for unit "${unit.name}"`} />
            <div className="flex ">
              <span className="">{assetName}</span>
              <MapPinIcon className="text-muted fill-muted-foreground" />
              <span className=""> {assetLocation}</span>
            </div>
          </div>
        }
      >
        <ButtonAddEditLease unit={unit} size={"sm"}>
          <PlusIcon /> New
        </ButtonAddEditLease>
      </DataTable>
      ss
    </Suspense>
  );
}
