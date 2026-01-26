/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { InvoiceData } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export const useInvoiceColumns: ColumnDef<InvoiceData>[] = [
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
      const invoice = row.original;
      const [open, setOpen] = useState(false);
      return <div className="flex  gap-2.5"></div>;
    },
  },
];
