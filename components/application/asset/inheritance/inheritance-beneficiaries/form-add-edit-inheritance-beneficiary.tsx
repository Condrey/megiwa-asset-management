import { NumberInput } from "@/components/number-input/number-input";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import TipTapViewer from "@/components/tip-tap-editor/tip-tap-viewer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { InheritanceBeneficiaryData, InheritanceEventData } from "@/lib/types";
import { formatPercentage } from "@/lib/utils";
import {
  inheritanceBeneficiarySchema,
  InheritanceBeneficiarySchema,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "date-fns";
import { HistoryIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { AssetTypeBadge } from "../../asset-badges";
import ButtonAddEditFamilyMember from "../../familyMember/button-add-edit-family-member";
import { useFamilyMembersQuery } from "../../familyMember/query";
import FieldFamilyMember from "./field-family-member";
import { useUpsertInheritanceBeneficiaryMutation } from "./mutations";

interface Props {
  shareholderShare: number;
  inheritanceBeneficiary?: InheritanceBeneficiaryData;
  event: InheritanceEventData;
  ownershipEnded: boolean;
  allShares: number;

  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
export default function FormAddEditInheritanceBeneficiary({
  inheritanceBeneficiary,
  shareholderShare,
  ownershipEnded,
  event,
  allShares,
  open,
  onOpenChange,
}: Props) {
  const {
    deceased: { fullName: dependantFullname, id: dependantId },
    beneficiaries,
    eventDate,
    notes,
    asset,
    id: eventId,
  } = event;
  const query = useFamilyMembersQuery();
  const { data, status } = query;

  const rem = shareholderShare - allShares;
  let remainingShares;
  if (!!inheritanceBeneficiary) {
    if (!ownershipEnded) {
      remainingShares = rem + inheritanceBeneficiary.share;
    } else {
      remainingShares = shareholderShare;
    }
  } else {
    remainingShares = rem;
  }

  const hasNoShares = remainingShares <= 0;

  const form = useForm<InheritanceBeneficiarySchema>({
    resolver: zodResolver(inheritanceBeneficiarySchema(remainingShares)),
    values: {
      id: inheritanceBeneficiary?.id || "",
      eventId: inheritanceBeneficiary?.eventId || eventId || "",
      memberId: inheritanceBeneficiary?.memberId || "",
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      share: inheritanceBeneficiary?.share!,
    },
  });
  const { mutate, isPending } = useUpsertInheritanceBeneficiaryMutation();
  function submitForm(input: InheritanceBeneficiarySchema) {
    mutate(input, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  }
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-fit overflow-y-auto scroll-smooth h-dvh"
      >
        <div className="max-w-7xl space-y-6 mx-auto w-full  ">
          <SheetHeader className="w-full">
            <SheetTitle>
              {inheritanceBeneficiary ? "Update" : "Create a new"} inheritance
              Beneficiary
            </SheetTitle>
            <SheetDescription className="space-x-3">
              <AssetTypeBadge type={asset.type} />
              <span>{asset.name}</span>
            </SheetDescription>
            <SheetDescription>
              {`${formatPercentage(shareholderShare / 100)} shares from dependant, ${dependantFullname}`}
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            {hasNoShares ? (
              <EmptyContainer
                title="No more shares left"
                description={`It is realized that all the ${formatPercentage(shareholderShare / 100)} shares for dependant "${dependantFullname}" for asset "${asset.name}" has been utilized fully. Update the shares of the available beneficiaries to continue.`}
              >
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => onOpenChange(false)}
                >
                  Close beneficiary form
                </Button>
              </EmptyContainer>
            ) : (
              <div className="space-y-6 p-3 w-fit md:w-lg">
                {status === "pending" ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-2/4" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                ) : status === "error" ? (
                  <ErrorContainer errorMessage="" query={query} />
                ) : status === "success" && !data?.length ? (
                  <EmptyContainer
                    title="No family member found"
                    description={`Start by adding a family member to the database.`}
                    required
                  >
                    <ButtonAddEditFamilyMember>
                      Add a family member
                    </ButtonAddEditFamilyMember>
                  </EmptyContainer>
                ) : (
                  <FieldFamilyMember
                    form={form}
                    dependantId={dependantId}
                    familyMembers={data}
                    isUpdating={!!inheritanceBeneficiary}
                  />
                )}
                <FormField
                  control={form.control}
                  name="share"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>
                        Beneficiary share percentage
                      </FormLabel>
                      <FormControl>
                        <NumberInput
                          min={0}
                          max={remainingShares}
                          disabled={hasNoShares}
                          placeholder="e.g., 6"
                          {...field}
                          value={field.value!}
                        />
                      </FormControl>
                      <FormDescription>
                        Remaining beneficiary shares: {remainingShares}%
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormFooter className="mt-6">
                  <LoadingButton
                    type="button"
                    loading={isPending}
                    size={"lg"}
                    onClick={() => form.handleSubmit(submitForm)()}
                  >
                    {inheritanceBeneficiary
                      ? "Update beneficiary info"
                      : "Create beneficiary"}
                  </LoadingButton>
                </FormFooter>
                <div>
                  <Accordion
                    type="multiple"
                    className="w-11/12 rounded-md mx-auto border p-3"
                  >
                    <AccordionItem value="notes">
                      <AccordionTrigger>
                        Show inheritance event notes
                      </AccordionTrigger>
                      <AccordionContent className="w-full flex flex-col gap-0.5">
                        <TipTapViewer content={notes} />
                        <div className="max-w-fit flex items-center ms-auto text-xs text-muted-foreground w-full ">
                          <HistoryIcon className="inline size-3" />
                          {formatDate(eventDate, "PPP")}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    {!!beneficiaries.length && (
                      <AccordionItem value="beneficiaries">
                        <AccordionTrigger>
                          Show all beneficiaries
                        </AccordionTrigger>
                        <AccordionContent>
                          {!beneficiaries.length ? (
                            <EmptyContainer
                              title="There are no beneficiaries assigned yet."
                              description="List of all the assigned beneficiaries for this inheritance event shall appear here."
                            />
                          ) : (
                            <div>
                              {beneficiaries.map((b) => (
                                <div key={b.id} className="table-row">
                                  <div className="table-cell">{b.share}</div>
                                  <div className="table-cell">
                                    {b.member.fullName}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                </div>
              </div>
            )}
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
