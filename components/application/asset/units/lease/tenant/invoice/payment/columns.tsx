"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { PaymentData } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Edit3Icon } from "lucide-react";
import ButtonAddEditPayment from "./button-add-edit-invoice";

export const usePaymentColumns: ColumnDef<PaymentData>[] = [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="s/n" />
    ),
    cell: ({ row }) => <span>{formatNumber(row.index + 1)}</span>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tenant details" />
    ),
    cell({ row }) {
      const { amount } = row.original;
      return <span>{formatCurrency(amount, "Ugx", true)}</span>;
    },
  },

  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="flex  gap-2.5">
          <ButtonAddEditPayment invoice={payment.invoice} size={"icon-sm"}>
            <Edit3Icon />
          </ButtonAddEditPayment>
        </div>
      );
    },
  },
];
