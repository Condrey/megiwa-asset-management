"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import TipTapViewer from "@/components/tip-tap-editor/tip-tap-viewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InheritanceEventData } from "@/lib/types";
import { formatNumber, formatPercentage } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import {
  AlertTriangleIcon,
  CircleIcon,
  Edit3Icon,
  PlusIcon,
} from "lucide-react";
import CommandItemFamilyMember, {
  BeneficiaryItemFamilyMember,
} from "../../familyMember/command-item-family-member";
import ButtonAddEditInheritanceBeneficiary from "../inheritance-beneficiaries/button-add-edit-inheritance-beneficiary";
import ButtonShowInheritanceBeneficiaries from "../inheritance-beneficiaries/button-show-inheritance-beneficiaries";
import ButtonAddEditInheritanceEvent from "./button-add-edit-inheritance-event";

export const useInheritanceEventColumns: ColumnDef<InheritanceEventData>[] = [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="s/n" />
    ),
    cell: ({ row }) => <span>{formatNumber(row.index + 1)}</span>,
  },
  {
    accessorKey: "deceased.fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deceased family member" />
    ),
    cell: ({ row }) => {
      const { deceased } = row.original;
      return (
        <CommandItemFamilyMember
          familyMember={deceased}
          isChecked={false}
          avatarSize="45px"
        />
      );
    },
  },
  {
    id: "shares",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Asset, shares to be inherited"
        className="text-center"
      />
    ),
    cell: ({ row }) => {
      const {
        deceased: { fullName: deceasedName },
        deceasedId,
        asset: { name: assetName, ownerships },
      } = row.original;
      const ownership = ownerships.find((d) => d.memberId === deceasedId);
      if (!ownership) {
        return (
          <p className="line-clamp-2 text-ellipsis max-w-md italic text-muted-foreground animate-pulse">{`${deceasedName} has no shares in this asset`}</p>
        );
      }
      const { share, previousShare, startDate, endDate } = ownership;
      const notCurrentShareHolder = share <= 0 || !!endDate;
      return (
        <div className="flex w-full flex-col items-center">
          <div className="text-muted-foreground text-xs">{assetName}</div>
          <div className="text-center slashed-zero">
            {notCurrentShareHolder ? (
              <p>
                <CircleIcon className="inline size-3 fill-destructive text-destructive" />{" "}
                held {formatPercentage(previousShare / 100)} shares
              </p>
            ) : (
              <p>
                <CircleIcon className="inline size-3 fill-success text-success" />{" "}
                holds {formatPercentage(share / 100)} shares
              </p>
            )}
          </div>
          <div className="">
            {!endDate ? (
              <Badge variant={notCurrentShareHolder ? "secondary" : "success"}>
                Since {formatDate(startDate, "PPP")}
              </Badge>
            ) : (
              <Badge
                variant={notCurrentShareHolder ? "secondary" : "destructive"}
              >
                {formatDate(startDate, "PPP")} - {formatDate(endDate, "PPP")}
              </Badge>
            )}
          </div>
        </div>
      );
    },
  },

  {
    id: "beneficiaries",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Inheritance beneficiaries"
        className="text-center"
      />
    ),
    cell: ({ row }) => {
      const {
        deceasedId,
        asset: { ownerships, inheritanceEvents },
        beneficiaries,
      } = row.original;
      const allShares = inheritanceEvents
        .flatMap((i) => i.beneficiaries)
        .reduce((val, total) => val + total.share, 0);
      const eventShares = beneficiaries.reduce(
        (val, total) => val + total.share,
        0,
      );
      const ownership = ownerships.find((d) => d.memberId === deceasedId);

      if (!ownership) {
        return (
          <p className="italic text-muted-foreground animate-pulse">N/A</p>
        );
      }
      const { share, endDate } = ownership;

      if (!beneficiaries.length) {
        const notCurrentShareHolder = share <= 0 || !!endDate;
        return (
          <div className="animate-pulse max-w-fit mx-auto">
            <ButtonAddEditInheritanceBeneficiary
              ownershipEnded={notCurrentShareHolder}
              shareholderShare={share}
              event={row.original}
              allShares={allShares}
              variant={"destructive"}
              size={"sm"}
            >
              <AlertTriangleIcon className="inline " />{" "}
              <span>Add beneficiary</span>
            </ButtonAddEditInheritanceBeneficiary>
          </div>
        );
      }

      return (
        <HoverCard>
          <HoverCardTrigger
            className="flex justify-center items-center"
            asChild
          >
            <Button className="max-w-fit mx-auto" variant={"link"}>
              show ({beneficiaries.length})
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="md:w-md space-y-4">
            <div>
              Has a total of {formatPercentage(eventShares / 100)} from{" "}
              {formatPercentage(share / 100)} shares including;
            </div>
            {beneficiaries.slice(0, 2).map((beneficiary) => (
              <BeneficiaryItemFamilyMember
                key={beneficiary.id}
                beneficiary={beneficiary}
                totalShares={null}
              />
            ))}
            {beneficiaries.length > 2 && (
              <div className="flex gap-0.5 text-muted-foreground items-center">
                <PlusIcon className="size-4" /> {beneficiaries.length - 2} more
              </div>
            )}
            <div className="max-w-fit mx-auto">
              <ButtonShowInheritanceBeneficiaries
                inheritanceEvent={row.original}
              >
                View details
              </ButtonShowInheritanceBeneficiaries>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "eventDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Inheritance event" />
    ),
    cell: ({ row }) => {
      const { eventDate, notes } = row.original;
      return (
        <div>
          <div className="text-muted-foreground">
            {formatDate(eventDate, "PPP")}
          </div>
          {notes && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"link"} size={"sm"}>
                  read event notes
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <TipTapViewer
                  content={notes}
                  className="line-clamp-1 text-ellipsis"
                />
              </TooltipContent>
            </Tooltip>
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
    cell({ row }) {
      const { asset } = row.original;
      return (
        <div className="flex">
          <ButtonAddEditInheritanceEvent
            asset={asset}
            size={"icon-sm"}
            inheritanceEvent={row.original}
          >
            <Edit3Icon />
          </ButtonAddEditInheritanceEvent>
        </div>
      );
    },
  },
];
