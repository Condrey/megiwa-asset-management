import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
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
import { Skeleton } from "@/components/ui/skeleton";
import { LeaseSchema } from "@/lib/validations";
import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import ButtonAddEditTenant from "./tenant/button-add-edit-tenant";
import {
  ChosenTenantCommandItem,
  CommandItemTenant,
} from "./tenant/command-item-tenant";
import { useTenantsQuery } from "./tenant/query";

interface Props {
  form: UseFormReturn<LeaseSchema>;
}
export default function FieldTenant({ form }: Props) {
  const [open, setOpen] = useState(false);
  const query = useTenantsQuery();
  const { data: tenants, status } = query;
  if (status === "error") {
    return <ErrorContainer errorMessage="" query={query} />;
  }
  if (status === "pending") {
    return (
      <div className="space-y-3 w-full flex flex-col">
        <Skeleton className={"h-6 w-1/4"} />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }
  if (!tenants.length) {
    return (
      <EmptyContainer title="">
        <ButtonAddEditTenant size={"sm"}>Add Tenant</ButtonAddEditTenant>
      </EmptyContainer>
    );
  }
  return (
    <FormField
      control={form.control}
      name="tenantId"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Tenant</FormLabel>
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
                    <ChosenTenantCommandItem
                      tenant={tenants.find(
                        (tenant) => tenant.id === field.value,
                      )}
                    />
                  ) : (
                    "Choose tenant..."
                  )}
                  <ChevronsUpDownIcon className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-fit  p-0">
              <Command>
                <CommandInput placeholder="Search member..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No tenant found.</CommandEmpty>
                  <CommandGroup>
                    {tenants.map((tenant) => (
                      <CommandItem
                        key={tenant.id}
                        value={tenant.id}
                        onSelect={(currentValue) => {
                          console.log({ currentValue });
                          form.setValue("tenantId", currentValue);
                          form.clearErrors("tenantId");
                          setOpen(false);
                        }}
                      >
                        <CommandItemTenant
                          tenant={tenant}
                          isChecked={field.value === tenant.id}
                          className="p-0"
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
