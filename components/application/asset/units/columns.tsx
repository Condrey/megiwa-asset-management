/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { buttonVariants } from "@/components/ui/button";
import { useCustomSearchParams } from "@/hooks/use-custom-search-param";
import { UnitData } from "@/lib/types";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Edit3Icon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { PropertyStatusBadge } from "../asset-badges";
import ButtonAddEditUnit from "./button-add-edit-unit";
import ButtonAddEditLease from "./lease/button-add-edit-lease";

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
      <DataTableColumnHeader column={column} title="Unit status" className="" />
    ),
    cell({ row }) {
      const { status } = row.original;
      return <PropertyStatusBadge propertyStatus={status} />;
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
      const { asset, id } = row.original;
      const { getNavigationLinkWithPathnameWithoutUpdate } =
        useCustomSearchParams();
      const url = getNavigationLinkWithPathnameWithoutUpdate(
        `/assets/${asset.type}/${asset.id}/unit/${id}`,
      );
      return (
        <div className="flex  gap-2.5">
          <ButtonAddEditUnit asset={asset} unit={row.original} size={"icon-sm"}>
            <Edit3Icon />
          </ButtonAddEditUnit>
          <ButtonAddEditLease unit={row.original}>
            <PlusIcon /> Lease
          </ButtonAddEditLease>
          <Link href={url} className={buttonVariants()}>
            View more
          </Link>
        </div>
      );
    },
  },
];
