import { NumberInput } from "@/components/number-input/number-input";
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
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Asset } from "@/lib/generated/prisma/client";
import { UnitData } from "@/lib/types";
import { UnitSchema, unitSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import FieldPropertyStatus from "./field-property-status";
import { useUpsertUnitMutation } from "./mutations";

interface Props {
  unit?: UnitData;
  asset: Asset;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
export default function FormAddEditUnit({
  unit,
  open,
  asset,
  onOpenChange,
}: Props) {
  const form = useForm<UnitSchema>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      id: unit?.id || "",
      assetId: unit?.assetId || asset.id || "",
      name: unit?.name || "",
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      rent: unit?.rent!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      status: unit?.status!,
    },
  });
  const { mutate, isPending } = useUpsertUnitMutation();
  function submitForm(input: UnitSchema) {
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
            <SheetTitle>{unit ? "Update" : "Create a new"} Unit</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <div className="space-y-6 p-3 w-fit md:w-lg lg:w-3xl">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Unit name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Room 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-3 w-full *:flex-1 *:w-full flex-col md:flex-row items-center">
                <FieldPropertyStatus form={form} />
                <FormField
                  control={form.control}
                  name="rent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rent amount</FormLabel>
                      <FormControl>
                        <NumberInput
                          placeholder="e.g., 30000"
                          {...field}
                          value={field.value!}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                  {unit ? "Update unit" : "Create unit"}
                </LoadingButton>
              </FormFooter>
            </div>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
