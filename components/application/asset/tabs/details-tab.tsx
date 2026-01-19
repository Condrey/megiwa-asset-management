import { DataTable } from "@/components/data-table/data-table";
import { TypographyH2, TypographyH4 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { AssetData } from "@/lib/types";
import { cn, formatPercentage } from "@/lib/utils";
import { formatDate } from "date-fns";
import { DotIcon, HistoryIcon, MapPinIcon, PlusIcon } from "lucide-react";
import { AssetLegalStatusBadge, AssetTypeBadge } from "../asset-badges";
import ButtonAddEditInheritanceEvent from "../inheritance/inheritance-event/button-add-edit-inheritance-event";
import { useInheritanceEventColumns } from "../inheritance/inheritance-event/columns";
import ButtonAssignOwnership from "../ownership/button-assign-ownership";
import { useOwnershipColumns } from "../ownership/columns";

export default function DetailsTab({ asset }: { asset: AssetData }) {
  const {
    name,
    type,
    createdAt,
    inheritanceEvents,
    legalStatus,
    location,
    ownerships,
    retiredAt,
    size,
  } = asset;
  const allShares = ownerships?.reduce((curr, val) => curr + val.share, 0) || 0;
  return (
    <TabsContent value="details" className="space-y-6">
      <div className="max-w-4xl me-auto space-y-2">
        <CardTitle className="gap-3 flex items-center">Asset: {name}</CardTitle>
        <CardDescription className="space-x-3">
          <AssetLegalStatusBadge
            legalStatus={legalStatus}
            className="opacity-60"
          />
          <AssetTypeBadge type={type} />
        </CardDescription>
        <CardDescription>
          <>
            {size && (
              <span className="inline-block">
                Size: {size}
                <DotIcon className="inline" />
              </span>
            )}
          </>
          <MapPinIcon className="inline mr-1.5 size-4.5 fill-muted-foreground text-muted" />
          Location: {location}
        </CardDescription>
        <CardDescription>
          <HistoryIcon className="inline size-4.5 mr-1.5" />
          Since: {formatDate(createdAt, "PP")} -{" "}
          {retiredAt ? formatDate(retiredAt, "PP") : "Now"}
        </CardDescription>
      </div>
      <TypographyH2
        text="Ownerships over the time"
        className="flex items-center justify-between flex-wrap gap-3"
      >
        {!!ownerships.length && (
          <ButtonAssignOwnership asset={asset}>
            <PlusIcon /> New Owner
          </ButtonAssignOwnership>
        )}
      </TypographyH2>

      {!ownerships.length ? (
        <EmptyContainer
          title={`There are no ownerships for "${name}" yet!`}
          description="Please assign an owner to this asset."
          required
        >
          <ButtonAssignOwnership asset={asset}>
            Assign an Owner
          </ButtonAssignOwnership>
        </EmptyContainer>
      ) : (
        <DataTable
          data={ownerships}
          columns={useOwnershipColumns}
          filterColumn={{ id: "member_fullName", label: "asset owner" }}
          tableHeaderSection={
            <div className="flex flex-row-reverse flex-wrap justify-between gap-2">
              <div>
                <AssetTypeBadge type={type} />
                <TypographyH4 text={name} />
              </div>
              <div className="me-auto">
                <CardTitle
                  className={cn(
                    "text-xl sm:text-2xl slashed-zero font-mono tabular-nums oldstyle-nums",
                    allShares >= 100 && "text-success"
                  )}
                >
                  {formatPercentage(allShares / 100)}
                </CardTitle>
                <CardDescription className="font-mono leading-2">
                  {allShares >= 100 ? "Fully shared" : "Shared"}
                </CardDescription>
              </div>
            </div>
          }
          className="w-full"
        >
          <ButtonAssignOwnership
            asset={asset}
            size={"sm"}
            variant={"secondary"}
          >
            <PlusIcon /> Owner
          </ButtonAssignOwnership>
        </DataTable>
      )}
      <TypographyH2
        text="Inheritance events"
        className="flex items-center justify-between flex-wrap gap-3"
      >
        {!!ownerships.length && (
          <ButtonAddEditInheritanceEvent asset={asset}>
            <PlusIcon /> New Event
          </ButtonAddEditInheritanceEvent>
        )}
      </TypographyH2>
      {!inheritanceEvents.length ? (
        <EmptyContainer
          title={`There are no events of inheritance for "${name}" yet!`}
          description="In a scenario where an inheritance event is to occur, add it from here."
        >
          <ButtonAddEditInheritanceEvent asset={asset}>
            Create an event
          </ButtonAddEditInheritanceEvent>
        </EmptyContainer>
      ) : (
        <DataTable
          data={inheritanceEvents}
          columns={useInheritanceEventColumns}
          filterColumn={{ id: "deceased_fullName", label: "deceased" }}
          className="w-full"
        />
      )}
    </TabsContent>
  );
}
