"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { UserDataSelect } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import ManagerItem from "./manager-item";

export const useManagersColumns: ColumnDef<UserDataSelect>[] = [
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
      return (
        <ManagerItem
          user={row.original}
          isChecked={false}
          variant={"outline"}
          className="p-0"
        />
      );
    },
  },

  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const {} = row.original;
      return <div className="flex  gap-2.5"></div>;
    },
  },
];
