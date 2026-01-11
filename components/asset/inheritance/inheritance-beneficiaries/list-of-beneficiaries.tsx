"use client";

import { DataTable } from "@/components/data-table/data-table";
import { TypographyH4 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import TipTapViewer from "@/components/tip-tap-editor/tip-tap-viewer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { InheritanceEventData } from "@/lib/types";
import { cn, formatPercentage } from "@/lib/utils";
import { formatDate } from "date-fns";
import { HistoryIcon, PlusIcon } from "lucide-react";
import { AssetTypeBadge } from "../../asset-badges";
import CommandItemFamilyMember from "../../familyMember/command-item-family-member";
import ButtonAddEditInheritanceBeneficiary from "./button-add-edit-inheritance-beneficiary";
import { useInheritanceBeneficiariesColumns } from "./columns";
import { useInheritanceBeneficiariesQuery } from "./query";

interface Props {
  event: InheritanceEventData;
  className?: string;
}
export default function ListOfInheritanceBeneficiaries({
  event,
  className,
}: Props) {
  const {
    beneficiaries: initialData,
    id: inheritanceEventId,
    asset,
    deceased,
    deceasedId,
    notes,
    eventDate,
  } = event;
  const query = useInheritanceBeneficiariesQuery({
    inheritanceEventId,
    initialData,
  });
  const { data: beneficiaries, status } = query;

  const allShares = event.asset.inheritanceEvents
    .flatMap((i) => i.beneficiaries)
    .reduce((val, total) => val + total.share, 0);
  const ownership = asset.ownerships.find((d) => d.memberId === deceasedId);

  if (!ownership) {
    return <p className="italic text-muted-foreground animate-pulse">N/A</p>;
  }
  const { share, endDate } = ownership;
  const notCurrentShareHolder = share <= 0 || !!endDate;
  const totalBeneficiaryShares = beneficiaries.reduce(
    (curr, sum) => curr + sum.share,
    0
  );
  const isFullyShared = totalBeneficiaryShares >= share;
  return (
    <div className={cn("w-full space-y-12", className)}>
      <Item>
        <ItemContent>
          <div className="flex justify-between items-start gap-2">
            <div className="">
              <ItemDescription>Asset</ItemDescription>
              <ItemTitle>{asset.name}</ItemTitle>
              <ItemDescription>
                <AssetTypeBadge type={asset.type} />{" "}
                <span>{asset.location}</span>
              </ItemDescription>
            </div>
            <div className="hidden md:flex flex-col">
              <ItemDescription>Dependant</ItemDescription>
              <ItemDescription>
                <CommandItemFamilyMember
                  familyMember={deceased}
                  isChecked={false}
                  variant="outline"
                  className="p-3"
                />
              </ItemDescription>
            </div>
          </div>
        </ItemContent>
      </Item>

      <div>
        {status === "error" ? (
          <ErrorContainer
            errorMessage="Failed to get list of inheritance event beneficiaries"
            query={query}
          />
        ) : status === "success" && !beneficiaries.length ? (
          <EmptyContainer
            title="There are no beneficiaries"
            description={`${asset.name} has no beneficiaries for this event`}
          />
        ) : (
          <DataTable
            data={beneficiaries}
            columns={useInheritanceBeneficiariesColumns}
            filterColumn={{ id: "member_fullName", label: "beneficiary" }}
            className="w-full"
            tableHeaderSection={
              <div className="flex justify-between gap-3">
                <div className="font-mono text-muted-foreground slashed-zero flex flex-col items-center">
                  <div>
                    {formatPercentage(totalBeneficiaryShares / 100)} of{" "}
                    {formatPercentage(share / 100)}
                  </div>
                  <div className={cn(isFullyShared && "text-success")}>
                    {isFullyShared ? "fully" : "total"} shares
                  </div>
                </div>
                <div>
                  <TypographyH4 text="List of Inheritance event beneficiaries" />
                  <span> as of {formatDate(eventDate, "PPP")}</span>
                </div>
              </div>
            }
          >
            <ButtonAddEditInheritanceBeneficiary
              allShares={allShares}
              event={event}
              ownershipEnded={notCurrentShareHolder}
              shareholderShare={share}
              variant={"secondary"}
              size={"icon-sm"}
            >
              <PlusIcon />
            </ButtonAddEditInheritanceBeneficiary>
          </DataTable>
        )}
      </div>
      <div>
        <Accordion
          type="multiple"
          className="w-full rounded-md mx-auto border p-3"
        >
          <AccordionItem value="notes">
            <AccordionTrigger>Show inheritance event notes</AccordionTrigger>
            <AccordionContent className="w-full flex flex-col gap-0.5">
              <TipTapViewer content={notes} />
              <div className="max-w-fit flex items-center ms-auto text-xs text-muted-foreground w-full ">
                <HistoryIcon className="inline size-3" />
                {formatDate(eventDate, "PPP")}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
