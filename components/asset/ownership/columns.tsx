"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { OwnershipData } from "@/lib/types";
import { formatNumber, formatPercentage } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { CircleIcon, CornerDownRightIcon, Edit3Icon } from "lucide-react";
import CommandItemFamilyMember from "../familyMember/command-item-family-member";
import ButtonAssignOwnership from "./button-assign-ownership";
import ButtonEndOwnership from "./button-end-ownership";
import PossessionDuration from "./possession";

export const useOwnershipColumns: ColumnDef<OwnershipData>[] = [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="s/n" />
    ),
    cell: ({ row }) => <span>{formatNumber(row.index + 1)}</span>,
  },
  {
    accessorKey: "member.fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asset owner" />
    ),
    cell({ row }) {
      const member = row.original.member;
      return (
        <CommandItemFamilyMember
          avatarSize="45px"
          familyMember={member}
          isChecked={false}
        />
      );
    },
  },
  {
    accessorKey: "share",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ownership share" />
    ),
    cell({ row }) {
      const {
        memberId,
        previousShare,
        share,
        asset: { inheritanceEvents },
      } = row.original;
      // const hh=  table.getAllColumns()[0].
      //     const allShares =
      // assetOwnerships?.reduce((curr, val) => curr + val.share, 0) || 0;
      const beneficiaries = inheritanceEvents
        .filter((f) => f.deceasedId === memberId)
        .flatMap((i) => i.beneficiaries);
      return (
        <div>
          <div className="tabular-nums slashed-zero oldstyle-nums">
            {formatPercentage(previousShare / 100)} shares
          </div>
          {share > 0 && (
            <div>
              <CircleIcon className="fill-success text-success inline size-3.5" />{" "}
              <span className="tabular-nums slashed-zero oldstyle-nums font-mono">
                currently holds {formatPercentage(share / 100)} shares
              </span>
            </div>
          )}
          {!!beneficiaries.length && (
            <div className="flex gap-0.5 items-end text-muted-foreground text-sm">
              <CornerDownRightIcon /> {beneficiaries.length} beneficiaries
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ownership period" />
    ),
    cell({ row }) {
      const { startDate, endDate } = row.original;
      return (
        <div>
          <div>
            {formatDate(startDate, "PPP")} -{" "}
            {endDate ? formatDate(endDate, "PPP") : "Now"}
          </div>
          <div className="text-xs text-muted-foreground tabular-nums w-56">
            <PossessionDuration endDate={endDate} startDate={startDate} />
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
      const ownership = row.original;
      return (
        <div className="flex flex-row-reverse gap-2.5">
          <ButtonAssignOwnership
            asset={ownership.asset}
            ownership={ownership}
            size={"icon-sm"}
          >
            <Edit3Icon />
          </ButtonAssignOwnership>
          {!ownership.endDate ? (
            <ButtonEndOwnership
              asset={ownership.asset}
              ownership={ownership}
              size={"sm"}
              variant={"outline"}
              className="flex-1"
            >
              End ownership
            </ButtonEndOwnership>
          ) : (
            <Button
              disabled
              size={"sm"}
              variant={"secondary"}
              className="flex-1"
            >
              Ownership ended
            </Button>
          )}
        </div>
      );
    },
  },
];
