"use client";
import { DataTable } from "@/components/data-table/data-table";
import { TypographyH3 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import { InvoiceData, LeaseData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { getAllLeaseInvoices } from "./actions";
import ButtonAddEditInvoice from "./button-add-edit-invoice";
import { useInvoiceColumns } from "./columns";
interface Props {
  invoices: InvoiceData[];
  lease: LeaseData;
  className?: string;
}
export function ListOfInvoices({
  invoices: initialData,
  lease,
  className,
}: Props) {
  const {
    unit: { name: unitName, rent: unitRent },
    tenant,
    startDate,
    endDate,
    rent,
  } = lease;
  const query = useQuery({
    queryKey: ["invoices", "lease", lease.id],
    queryFn: async () => getAllLeaseInvoices(lease.id),
    initialData,
  });
  const { status, data: invoices } = query;

  return (
    <div className={cn("", className)}>
      {status === "error" ? (
        <ErrorContainer
          errorMessage="Failed to get invoices for this lease"
          query={query}
        />
      ) : !invoices.length ? (
        <EmptyContainer
          title="No invoice found"
          description="Start by invoicing the lease using this button"
        >
          <ButtonAddEditInvoice lease={lease} variant={"secondary"}>
            Invoice lease
          </ButtonAddEditInvoice>
        </EmptyContainer>
      ) : (
        <DataTable
          data={invoices}
          columns={useInvoiceColumns}
          filterColumn={{ id: "tenant_fullName", label: "tenant name" }}
          className="w-full"
          tableHeaderSection={
            <div>
              <TypographyH3 text={`Invoices for the lease `} />
              <div className="flex ">
                <span className="">{unitName}</span>
              </div>
            </div>
          }
        >
          <ButtonAddEditInvoice lease={lease} size={"sm"}>
            <PlusIcon /> New
          </ButtonAddEditInvoice>
        </DataTable>
      )}
    </div>
  );
}
