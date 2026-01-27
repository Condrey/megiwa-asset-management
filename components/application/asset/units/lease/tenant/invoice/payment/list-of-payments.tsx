"use client";
import { DataTable } from "@/components/data-table/data-table";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import { InvoiceData, PaymentData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { getAllInvoicePayments } from "./actions";
import ButtonAddEditPayment from "./button-add-edit-invoice";
import { usePaymentColumns } from "./columns";
interface Props {
  payments: PaymentData[];
  invoice: InvoiceData;
  className?: string;
}
export function ListOfPayments({
  payments: initialData,
  invoice,
  className,
}: Props) {
  const { lease } = invoice;
  const query = useQuery({
    queryKey: ["payments", "invoice", invoice.id],
    queryFn: async () => getAllInvoicePayments(invoice.id),
    initialData,
  });
  const { status, data: payments } = query;

  return (
    <div className={cn("", className)}>
      {status === "error" ? (
        <ErrorContainer
          errorMessage="Failed to get payments for this invoice"
          query={query}
        />
      ) : !payments.length ? (
        <EmptyContainer
          title="No payment found"
          description="Start by invoicing the invoice using this button"
        >
          <ButtonAddEditPayment invoice={invoice} variant={"secondary"}>
            Payment invoice
          </ButtonAddEditPayment>
        </EmptyContainer>
      ) : (
        <DataTable
          data={payments}
          columns={usePaymentColumns}
          className="w-full"
        >
          <ButtonAddEditPayment invoice={invoice} size={"sm"}>
            <PlusIcon /> New
          </ButtonAddEditPayment>
        </DataTable>
      )}
    </div>
  );
}
