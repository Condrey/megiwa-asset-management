"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { propertyStatuses } from "@/lib/enums";
import { UnitData } from "@/lib/types";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Edit3Icon } from "lucide-react";
import ButtonAddEditUnit from "./button-add-edit-unit";

export const useUnitColumns: ColumnDef<UnitData>[] = [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="s/n" />
    ),
    cell: ({ row }) => <span>{formatNumber(row.index + 1)}</span>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit name" />
    ),
    cell({ row }) {
      const { name } = row.original;
      return <span>{name}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="text-center w-full"
      />
    ),
    cell({ row }) {
      const { status } = row.original;
      const { icon: Icon, title, variant } = propertyStatuses[status];
      return (
        <div className="max-w-44 mx-auto w-full">
          <Badge
            variant={variant}
            className="h-6 [&>svg]:size-4 w-full flex flex-row justify-around "
          >
            <Icon />
            {title}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "rent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rent amount" />
    ),
    cell({ row }) {
      const { rent } = row.original;
      return <>{!rent ? "Not Added" : <span>{formatCurrency(rent)}</span>}</>;
    },
  },
  {
    accessorKey: "leases",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Leases" />
    ),
    cell({ row }) {
      const { leases } = row.original;
      const noOfLeases = leases.length;
      const notLeased = noOfLeases === 0;
      return (
        <div className={cn(notLeased && "text-destructive italic")}>
          {notLeased ? (
            "Not yet leased"
          ) : (
            <span>{`${noOfLeases} Lease${noOfLeases === 1 ? "" : "s"}`}</span>
          )}
        </div>
      );
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
          <ButtonAddEditUnit asset={asset} unit={row.original} size={"icon-sm"}>
            <Edit3Icon />
          </ButtonAddEditUnit>
        </div>
      );
    },
  },
];
