import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Asset } from "@/lib/generated/prisma/client";
import { InheritanceEventSchema } from "@/lib/validations";
import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import CommandItemFamilyMember, {
  ChosenFamilyMemberCommandItem,
} from "../../familyMember/command-item-family-member";
import { useFamilyMembersOwningAssetQuery } from "../../familyMember/query";
import ButtonAssignOwnership from "../../ownership/button-assign-ownership";

interface Props extends ButtonProps {
  inheritanceForm: UseFormReturn<InheritanceEventSchema>;
  asset: Asset;
}
export default function FieldDeceased({
  inheritanceForm,
  asset,
  disabled,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);
  const query = useFamilyMembersOwningAssetQuery(asset.id);
  const { data: deceaseds, status } = query;
  if (status === "error") {
    return <ErrorContainer errorMessage="" query={query} />;
  }
  if (status === "pending") {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-2/4" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }
  if (status === "success" && !deceaseds.length) {
    return (
      <EmptyContainer
        title="No family member owns this asset"
        description={`First start by creating ownerships and shares for this asset (${asset.name}) before creating an inheritance event.`}
        required
      >
        <ButtonAssignOwnership asset={asset}>
          Create shares
        </ButtonAssignOwnership>
      </EmptyContainer>
    );
  }
  return (
    <FormField
      control={inheritanceForm.control}
      name="deceasedId"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Deceased shareholder</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  type="button"
                  aria-expanded={open}
                  disabled={disabled}
                  className="w-full justify-between"
                  {...props}
                >
                  {field.value ? (
                    <ChosenFamilyMemberCommandItem
                      familyMember={deceaseds.find(
                        (deceased) => deceased.id === field.value
                      )}
                    />
                  ) : (
                    "Choose a deceased member..."
                  )}
                  <ChevronsUpDownIcon className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-fit  p-0">
              <Command>
                <CommandInput placeholder="Search member..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No member found.</CommandEmpty>
                  <CommandGroup>
                    {deceaseds.map((deceased) => (
                      <CommandItem
                        key={deceased.id}
                        value={deceased.id}
                        onSelect={(currentValue) => {
                          console.log({ currentValue });
                          inheritanceForm.setValue("deceasedId", currentValue);
                          inheritanceForm.clearErrors("deceasedId");
                          setOpen(false);
                        }}
                      >
                        <CommandItemFamilyMember
                          familyMember={deceased}
                          avatarSize={"45px"}
                          isChecked={field.value === deceased.id}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {disabled && (
            <FormDescription>
              You can not change this field when updating
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
