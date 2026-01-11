import { Button } from "@/components/ui/button";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FamilyMemberData } from "@/lib/types";
import { OwnershipSchema } from "@/lib/validations";
import { ChevronsUpDownIcon, SquareCheckBigIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import ButtonAddEditFamilyMember from "../familyMember/button-add-edit-family-member";
import CommandItemFamilyMember, {
  ChosenFamilyMemberCommandItem,
} from "../familyMember/command-item-family-member";

interface Props {
  form: UseFormReturn<OwnershipSchema>;
  familyMembers: FamilyMemberData[];
  isWhiteListing: boolean;
}
export default function FieldFamilyMember({
  form,
  familyMembers,
  isWhiteListing,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name="memberId"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Family member</FormLabel>
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
                    "Choose family member..."
                  )}
                  <ChevronsUpDownIcon className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search member..." className="h-9" />
                <CommandList>
                  <CommandEmpty className="p-3 flex flex-col justify-center max-w-sm text-center items-center gap-2">
                    <p className="inline-block">
                      No member found.{" "}
                      {isWhiteListing && (
                        <span className="block">
                          Uncheck{" "}
                          <SquareCheckBigIcon className="inline size-4 mr-1 align-middle" />
                          <strong className="inline-block">
                            Should whitelist previous owners
                          </strong>{" "}
                          for more names or
                        </span>
                      )}
                    </p>
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
  );
}
