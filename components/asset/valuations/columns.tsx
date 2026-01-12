"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ValuationData } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Edit3Icon } from "lucide-react";
import ButtonAddEditValuation from "./button-add-edit-valuation";

export const useValuationColumns: ColumnDef<ValuationData>[] = [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="s/n" />
    ),
    cell: ({ row }) => <span>{formatNumber(row.index + 1)}</span>,
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valuation value" />
    ),
    cell({ row }) {
      const { value } = row.original;
      return (
        <span className="oldstyle-nums slashed-zero tabular-nums font-mono">
          {formatCurrency(value)}
        </span>
      );
    },
  },
  {
    accessorKey: "valuedOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valuation date" />
    ),
    cell({ row }) {
      const { valuedOn } = row.original;
      return <div>{formatDate(valuedOn, "PPP")}</div>;
    },
  },

  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const { asset } = row.original;
      return (
        <div className="flex  gap-2.5">
          <ButtonAddEditValuation
            asset={asset}
            valuation={row.original}
            size={"icon-sm"}
          >
            <Edit3Icon />
          </ButtonAddEditValuation>
        </div>
      );
    },
  },
];
