/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { NumberInput } from "@/components/number-input/number-input";
import { EmptyContainer } from "@/components/query-container/empty-container";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/ui/loading-button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Asset } from "@/lib/generated/prisma/client";
import { FamilyMemberData, OwnershipData } from "@/lib/types";
import { createOwnershipSchema, OwnershipSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2Icon, PlusIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { AssetTypeBadge } from "../asset-badges";
import ButtonAddEditFamilyMember from "../familyMember/button-add-edit-family-member";
import FieldDateEnd from "./field-date-end";
import FieldDateStart from "./field-date-start";
import FieldFamilyMember from "./field-family-member";
import { useUpsertOwnershipMutation } from "./mutations";

interface FormAssignOwnershipProps {
  asset: Asset;
  ownership?: OwnershipData;
  assetOwnerships: OwnershipData[] | undefined;
  familyMembers: FamilyMemberData[];
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
export default function FormAssignOwnership({
  asset,
  ownership,
  familyMembers,
  open,
  onOpenChange,
  assetOwnerships,
}: FormAssignOwnershipProps) {
  const { name, type } = asset;
  const [shouldWhitelist, setShouldWhiteList] = useState(
    ownership ? false : !!familyMembers.length,
  );

  const whiteListedFamilyMemberIds = assetOwnerships?.map((a) => a.memberId);
  const allShares =
    assetOwnerships?.reduce((curr, val) => curr + val.share, 0) || 0;
  const rem = 100 - allShares;
  let remainingShares;
  if (!!ownership) {
    if (!ownership.endDate) {
      remainingShares = rem + ownership.share;
    } else {
      remainingShares = 100;
    }
  } else {
    remainingShares = rem;
  }

  const hasNoShares = remainingShares <= 0;

  const form = useForm<OwnershipSchema>({
    resolver: zodResolver(createOwnershipSchema(remainingShares)),
    values: {
      id: ownership?.id || "",
      assetId: ownership?.assetId || asset.id,
      memberId: ownership?.memberId || "",
      share: ownership?.share!,
      startDate: ownership?.startDate!,
      endDate: ownership?.endDate,
    },
  });

  const { mutate, isPending } = useUpsertOwnershipMutation();
  function submitForm(input: OwnershipSchema) {
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
        side="top"
        className="min-h-1/2 overflow-y-auto scroll-smooth max-h-dvh"
      >
        <div className="max-w-3xl space-y-6 mx-auto w-full  ">
          <SheetHeader className="w-full">
            <SheetTitle>
              {ownership ? "Update" : "Designate a new"} ownership
            </SheetTitle>
            <SheetDescription>
              <AssetTypeBadge type={type} className="mr-2" />
              {name}
            </SheetDescription>
          </SheetHeader>
          {/* <pre>{JSON.stringify({ allShares }, null, 2)}</pre> */}
          {hasNoShares ? (
            <EmptyContainer
              title="No more shares left"
              description={`It is realized that all the shares for "${name}" has been utilized fully. Update the shares of the available owners to continue.`}
            >
              <Button
                type="button"
                variant={"outline"}
                onClick={() => onOpenChange(false)}
              >
                Close ownership form
              </Button>
            </EmptyContainer>
          ) : (
            <Form {...form}>
              {!familyMembers.length ? (
                <EmptyContainer
                  title="There are no existing family member(s)."
                  description="Only family members can be chosen. In order to choose a member, first add a new family member since your database has no family members."
                  icon={Building2Icon}
                  required
                >
                  <ButtonAddEditFamilyMember>
                    Add Family Member
                  </ButtonAddEditFamilyMember>
                </EmptyContainer>
              ) : (
                <form
                  onSubmit={form.handleSubmit(submitForm)}
                  className="space-y-6"
                >
                  <Item variant={"muted"}>
                    <ItemContent>
                      <ItemTitle>Asset Owner: Missing in list</ItemTitle>
                      <ItemDescription>
                        This is the family member who is to own this asset. If
                        the name of the individual you are looking for does not
                        appear in this dropdown list, start by adding them as a
                        family member.
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <ButtonAddEditFamilyMember variant={"outline"}>
                        <PlusIcon /> Family member
                      </ButtonAddEditFamilyMember>
                    </ItemActions>
                  </Item>

                  <Item variant={"outline"}>
                    <ItemContent className="space-y-5">
                      <Label htmlFor="checkBox" className="">
                        <Checkbox
                          id="checkBox"
                          className="float-start mr-0.5"
                          disabled={!!ownership}
                          checked={shouldWhitelist}
                          onCheckedChange={() =>
                            setShouldWhiteList(!shouldWhitelist)
                          }
                        />
                        <ItemTitle>Should Whitelist previous owners?</ItemTitle>
                        <ItemDescription>
                          Prevent an individual from owning the asset more than
                          once.
                        </ItemDescription>
                      </Label>
                      <FieldFamilyMember
                        form={form}
                        familyMembers={
                          !shouldWhitelist
                            ? familyMembers
                            : whiteListedFamilyMemberIds
                              ? familyMembers.filter(
                                  (f) =>
                                    !whiteListedFamilyMemberIds.includes(f.id),
                                )
                              : familyMembers
                        }
                        isWhiteListing={shouldWhitelist}
                      />
                    </ItemContent>
                  </Item>

                  <FormField
                    control={form.control}
                    name="share"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Share percentage</FormLabel>
                        <FormControl>
                          <NumberInput
                            min={0}
                            max={remainingShares}
                            disabled={hasNoShares}
                            placeholder="e.g., 10.5"
                            {...field}
                            value={field.value!}
                          />
                        </FormControl>
                        <FormDescription>
                          Remaining shares: {remainingShares}%
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-3 w-full *:flex-1 *:w-full flex-col md:flex-row items-center">
                    <FieldDateStart form={form} />
                    <FieldDateEnd form={form} />
                  </div>
                  {/* <pre>{JSON.stringify(form.watch(), null, 2)}</pre> */}
                  <FormFooter className="my-6">
                    <Button
                      onClick={() => form.reset()}
                      type="reset"
                      size={"lg"}
                      variant={"outline"}
                    >
                      Reset Form
                    </Button>
                    <LoadingButton
                      type="button"
                      loading={isPending}
                      size={"lg"}
                      onClick={() => form.handleSubmit(submitForm)()}
                    >
                      {ownership ? "Update ownership" : "Create ownership"}
                    </LoadingButton>
                  </FormFooter>
                </form>
              )}
            </Form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
