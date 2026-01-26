/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { LeaseData } from "@/lib/types";
import {
  calculateDuration,
  cn,
  formatCurrency,
  formatNumber,
} from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  Edit3Icon,
  PlusIcon,
} from "lucide-react";
import { useState } from "react";
import ButtonAddEditLease from "./button-add-edit-lease";
import { CommandItemTenant } from "./tenant/command-item-tenant";
import ButtonShowInvoices from "./tenant/invoice/button-show-invoices";

export const useLeaseColumns: ColumnDef<LeaseData>[] = [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="s/n" />
    ),
    cell: ({ row }) => <span>{formatNumber(row.index + 1)}</span>,
  },
  {
    accessorKey: "tenant.fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tenant details" />
    ),
    cell({ row }) {
      const { tenant } = row.original;
      return (
        <CommandItemTenant isChecked={false} tenant={tenant} className="p-0" />
      );
    },
  },
  {
    accessorKey: "unit.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit" />
    ),
  },
  {
    accessorKey: "rent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rent Amount" />
    ),
    cell({ row }) {
      const {
        rent,
        unit: { rent: unitRent },
      } = row.original;
      const isRentLeasedSame = rent === unitRent;
      const isLeasedLess = rent < (unitRent ?? 0);
      return (
        <div className="slashed-zero font-sans w-full font-medium">
          {!isRentLeasedSame && (
            <div className={cn("flex items-center  w-full")}>
              <span>
                {isLeasedLess ? (
                  <ArrowDownIcon className="text-destructive " />
                ) : (
                  <ArrowUpIcon className="text-success" />
                )}
              </span>
              <span className="">{formatCurrency(rent, "Ugx", true)}</span>
            </div>
          )}
          <div
            className={cn(
              !isRentLeasedSame &&
                "font-normal text-muted-foreground tracking-wider",
            )}
          >
            {formatCurrency(unitRent || 0, "Ugx", true)}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "invoices",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoices" />
    ),
    cell({ row }) {
      const { invoices, rent } = row.original;
      const totalAmountPaid = invoices.reduce(
        (amount, total) => amount + total.amount,
        0,
      );
      const hasABalance = totalAmountPaid < rent;
      const isFullyPaid = totalAmountPaid === rent;
      const balance = rent - totalAmountPaid;
      return (
        <div>
          {hasABalance ? (
            <>
              <div>
                {totalAmountPaid === 0
                  ? "Has not made payment"
                  : `Paid ${formatCurrency(totalAmountPaid, "Ugx", true)}`}
              </div>
              <div>
                <span className="italic text-muted-foreground">Bal of</span>{" "}
                <span className="text-destructive slashed-zero">
                  {formatCurrency(balance, "Ugx", true)}
                </span>
              </div>
            </>
          ) : isFullyPaid ? (
            <>
              <div className="text-success font-semibold slashed-zero">
                {formatCurrency(totalAmountPaid, "Ugx", true)}
              </div>
              <div className="text-muted-foreground">
                <CheckIcon className="inline size-4" />
                fully paid
              </div>
            </>
          ) : (
            <>
              <div className="text-success font-semibold slashed-zero">
                Paid {formatCurrency(totalAmountPaid, "Ugx", true)}
              </div>
              <div>
                <span className="italic text-muted-foreground">Extra of</span>{" "}
                <span className="text-success slashed-zero">
                  <PlusIcon className="size-3 inline" />{" "}
                  {formatCurrency(balance, "Ugx", true)}
                </span>
              </div>
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell({ row }) {
      const { startDate, endDate } = row.original;
      return (
        <div>
          <div>
            <span className={cn("", endDate && "font-semibold")}>
              {formatDate(startDate, "PP")}
            </span>
            {endDate && (
              <span className="font-semibold">{` - ${formatDate(endDate, "PP")}`}</span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {calculateDuration({ startDate, endDate })}
          </div>
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
      const lease = row.original;
      const [open, setOpen] = useState(false);
      return (
        <div className="flex  gap-2.5">
          <ButtonAddEditLease lease={lease} unit={lease.unit} size={"icon-sm"}>
            <Edit3Icon />
          </ButtonAddEditLease>
          <ButtonShowInvoices lease={lease}>View more</ButtonShowInvoices>
        </div>
      );
    },
  },
];
