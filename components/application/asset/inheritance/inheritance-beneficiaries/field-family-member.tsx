import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FamilyMemberData } from "@/lib/types";
import { InheritanceBeneficiarySchema } from "@/lib/validations";
import { ChevronsUpDownIcon, SquareCheckBigIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import ButtonAddEditFamilyMember from "../../familyMember/button-add-edit-family-member";
import CommandItemFamilyMember, {
  ChosenFamilyMemberCommandItem,
} from "../../familyMember/command-item-family-member";

interface Props {
  form: UseFormReturn<InheritanceBeneficiarySchema>;
  dependantId: string;
  isUpdating: boolean;
  familyMembers: FamilyMemberData[];
}
export default function FieldFamilyMember({
  form,
  familyMembers: allFamilyMembers,
  dependantId,
  isUpdating,
}: Props) {
  const [open, setOpen] = useState(false);

  // 1. Dependant should not exist among beneficiaries
  // 2. Filter out deceased members
  const familyMembersWithoutDependant =
    allFamilyMembers?.filter((b) => b.id !== dependantId) || [];
  const [shouldWhitelist, setShouldWhiteList] = useState(
    isUpdating ? false : !!allFamilyMembers.length
  );
  const whiteListedFamilyMemberIds = familyMembersWithoutDependant
    .filter((f) => f.isDeceased)
    .map((m) => m.id);
  const familyMembers = !shouldWhitelist
    ? familyMembersWithoutDependant
    : !!whiteListedFamilyMemberIds.length
      ? familyMembersWithoutDependant.filter(
          (f) => !whiteListedFamilyMemberIds.includes(f.id)
        )
      : familyMembersWithoutDependant;
  return (
    <Item variant={"outline"}>
      <ItemContent className="space-y-5">
        <Label htmlFor="checkBox" className="">
          <Checkbox
            id="checkBox"
            className="float-start mr-0.5"
            disabled={!isUpdating}
            checked={shouldWhitelist}
            onCheckedChange={() => setShouldWhiteList(!shouldWhitelist)}
          />
          <ItemTitle>Should Whitelist deceased beneficiaries?</ItemTitle>
          <ItemDescription>
            Prevent assigning deceased family members as beneficiaries.
          </ItemDescription>
        </Label>
        <FormField
          control={form.control}
          name="memberId"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Beneficiary family member</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {field.value ? (
                        <ChosenFamilyMemberCommandItem
                          familyMember={familyMembers.find(
                            (familyMember) => familyMember.id === field.value
                          )}
                        />
                      ) : (
                        "Choose a family beneficiary member..."
                      )}
                      <ChevronsUpDownIcon className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search member..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty className="p-3 flex flex-col justify-center max-w-sm text-center items-center gap-2">
                        <p className="inline-block">
                          No member found.{" "}
                          {shouldWhitelist && (
                            <span className="block">
                              Uncheck{" "}
                              <SquareCheckBigIcon className="inline size-4 mr-1 align-middle" />
                              <strong className="inline-block">
                                Should whitelist deceased beneficiaries
                              </strong>{" "}
                              for more names or
                            </span>
                          )}
                        </p>{" "}
                        <ButtonAddEditFamilyMember variant={"secondary"}>
                          Add a new family member
                        </ButtonAddEditFamilyMember>
                      </CommandEmpty>
                      <CommandGroup>
                        {familyMembers.map((familyMember) => (
                          <CommandItem
                            key={familyMember.id}
                            value={familyMember.id}
                            onSelect={(currentValue) => {
                              form.setValue("memberId", currentValue);
                              form.clearErrors("memberId");
                              setOpen(false);
                            }}
                          >
                            <CommandItemFamilyMember
                              isChecked={field.value === familyMember.id}
                              familyMember={familyMember}
                              avatarSize="45px"
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
      </ItemContent>
    </Item>
  );
}
