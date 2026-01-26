import { NumberInput } from "@/components/number-input/number-input";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import LoadingButton from "@/components/ui/loading-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Unit } from "@/lib/generated/prisma/client";
import { LeaseData } from "@/lib/types";
import { LeaseSchema, leaseSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import FieldDateEnd from "./field-date-end";
import FieldDateStart from "./field-date-start";
import FieldTenant from "./field-tenant";
import { useUpsertLeaseMutation } from "./mutations";
import ButtonAddEditTenant from "./tenant/button-add-edit-tenant";
import { useTenantsQuery } from "./tenant/query";

interface Props {
  lease?: LeaseData;
  unit: Unit;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
export default function FormAddEditLease({
  lease,
  open,
  unit,
  onOpenChange,
}: Props) {
  const form = useForm<LeaseSchema>({
    resolver: zodResolver(leaseSchema),
    defaultValues: {
      id: lease?.id || "",
      rent: lease?.rent || unit.rent!,
      tenantId: lease?.tenantId || "",
      unitId: lease?.unitId || unit.id || "",
      startDate: lease?.startDate || new Date(),
      endDate: lease?.endDate,
    },
  });
  const { mutate, isPending } = useUpsertLeaseMutation(unit.assetId);

  const query = useTenantsQuery();
  const { data: tenants, status } = query;

  function submitForm(input: LeaseSchema) {
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
            <SheetTitle>{lease ? "Update" : "Create a new"} Lease</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <div className="space-y-6 p-3 w-fit md:w-md lg:w-lg">
              {status === "error" ? (
                <ErrorContainer
                  errorMessage="Failed to fetch a list of tenants"
                  query={query}
                />
              ) : status === "pending" ? (
                <EmptyContainer
                  title="Fetching tenants"
                  description="Please be patient while the database fetches list of tenants"
                  className="space-y-3 w-full flex flex-col [&svg]:animate-spin"
                />
              ) : !tenants.length ? (
                <EmptyContainer
                  title="Missing Tenants"
                  description="To begin, add tenants using the button below"
                  required
                >
                  <ButtonAddEditTenant size={"sm"}>
                    Add Tenant
                  </ButtonAddEditTenant>
                </EmptyContainer>
              ) : (
                <>
                  <Item variant={"muted"}>
                    <ItemContent>
                      <ItemTitle>Add a new Tenant</ItemTitle>
                      <ItemDescription>
                        Is there a new tenant you would love to add? You may add
                        a new tenant from this button
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <ButtonAddEditTenant>
                        <PlusIcon /> Tenant
                      </ButtonAddEditTenant>
                    </ItemActions>
                  </Item>
                  <FormField
                    control={form.control}
                    name="rent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Rent amount</FormLabel>
                        <FormControl>
                          <NumberInput
                            placeholder="enter rent amount"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FieldTenant form={form} />
                  <FieldDateStart form={form} />
                  <FieldDateEnd form={form} />

                  <FormFooter className="mt-6">
                    <Button
                      onClick={() => form.reset()}
                      type="button"
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
                      {lease ? "Update lease" : "Create lease"}
                    </LoadingButton>
                  </FormFooter>
                </>
              )}
            </div>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
