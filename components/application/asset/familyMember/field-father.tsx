import ErrorContainer from "@/components/query-container/error-container";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Gender } from "@/lib/generated/prisma/enums";
import { cn } from "@/lib/utils";
import { FamilyMemberSchema } from "@/lib/validations";
import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import CommandItemFamilyMember, {
  ChosenFamilyMemberCommandItem,
} from "./command-item-family-member";
import { useFamilyMembersQuery } from "./query";

interface Props {
  form: UseFormReturn<FamilyMemberSchema>;
}
export default function FieldFather({ form }: Props) {
  const [open, setOpen] = useState(false);
  const query = useFamilyMembersQuery();
  const { data: familyMembers, status } = query;
  if (status === "error") {
    return <ErrorContainer errorMessage="" query={query} />;
  }
  if (status === "pending") {
    return <Skeleton className={cn(buttonVariants())} />;
  }
  const fathers = familyMembers.filter((f) => f.gender === Gender.MALE);

  return (
    <FormField
      control={form.control}
      name="fatherId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Father</FormLabel>
          {!fathers.length ? (
            <span className="italic outline cursor-progress rounded-md h-9 px-3 py-2 text-muted-foreground bg-muted">
              Add a male family member first
            </span>
          ) : (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    type="button"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {field.value ? (
                      <ChosenFamilyMemberCommandItem
                        familyMember={fathers.find(
                          (father) => father.id === field.value,
                        )}
                      />
                    ) : (
                      "Choose family member..."
                    )}
                    <ChevronsUpDownIcon className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-fit  p-0">
                <Command>
                  <CommandInput
                    placeholder="Search member..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No member found.</CommandEmpty>
                    <CommandGroup>
                      {fathers.map((father) => (
                        <CommandItem
                          key={father.id}
                          value={father.id}
                          onSelect={(currentValue) => {
                            console.log({ currentValue });
                            form.setValue("fatherId", currentValue);
                            form.clearErrors("fatherId");
                            setOpen(false);
                          }}
                          disabled={father.id === form.watch("motherId")}
                        >
                          <CommandItemFamilyMember
                            familyMember={father}
                            avatarSize={"45px"}
                            isChecked={field.value === father.id}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
