"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { InheritanceBeneficiaryData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Edit3Icon } from "lucide-react";
import { BeneficiaryItemFamilyMember } from "../../familyMember/command-item-family-member";
import ButtonAddEditInheritanceBeneficiary from "./button-add-edit-inheritance-beneficiary";

export const useInheritanceBeneficiariesColumns: ColumnDef<InheritanceBeneficiaryData>[] =
  [
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
        <DataTableColumnHeader
          column={column}
          title="Beneficiary member and shares"
        />
      ),
      cell: ({ row }) => {
        return (
          <BeneficiaryItemFamilyMember
            beneficiary={row.original}
            totalShares={0}
            className="max-w-md"
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
        const { event } = row.original;
        const { asset, deceasedId } = event;
        const allShares = event.asset.inheritanceEvents
          .flatMap((i) => i.beneficiaries)
          .reduce((val, total) => val + total.share, 0);
        const ownership = asset.ownerships.find(
          (d) => d.memberId === deceasedId
        );

        if (!ownership) {
          return (
            <p className="italic text-muted-foreground animate-pulse">N/A</p>
          );
        }
        const { share, endDate } = ownership;
        const notCurrentShareHolder = share <= 0 || !!endDate;

        return (
          <div>
            <ButtonAddEditInheritanceBeneficiary
              event={{ ...event, beneficiaries: [] }}
              shareholderShare={share}
              allShares={allShares}
              ownershipEnded={notCurrentShareHolder}
              inheritanceBeneficiary={row.original}
              size={"icon-sm"}
            >
              <Edit3Icon />
            </ButtonAddEditInheritanceBeneficiary>
          </div>
        );
      },
    },
  ];
