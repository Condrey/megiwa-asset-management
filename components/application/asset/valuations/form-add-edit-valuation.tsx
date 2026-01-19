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
import LoadingButton from "@/components/ui/loading-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Asset } from "@/lib/generated/prisma/client";
import { ValuationData } from "@/lib/types";
import { ValuationSchema, valuationSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import FieldValuedOnDate from "./field-valued-on-date";
import { useUpsertValuationMutation } from "./mutations";

interface Props {
  valuation?: ValuationData;
  asset: Asset;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
export default function FormAddEditValuation({
  valuation,
  open,
  asset,
  onOpenChange,
}: Props) {
  const form = useForm<ValuationSchema>({
    resolver: zodResolver(valuationSchema),
    values: {
      id: valuation?.id || "",
      assetId: valuation?.assetId || asset.id || "",
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      value: valuation?.value!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      valuedOn: valuation?.valuedOn!,
    },
  });
  const { mutate, isPending } = useUpsertValuationMutation();
  function submitForm(input: ValuationSchema) {
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
              {valuation ? "Update" : "Create a new"} Valuation
            </SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <div className="space-y-6 p-3 w-fit md:w-lg lg:w-xl">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Value of asset</FormLabel>
                    <FormControl>
                      <NumberInput placeholder="e.g., 200000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FieldValuedOnDate form={form} />

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
                  {valuation ? "Update valuation" : "Create valuation"}
                </LoadingButton>
              </FormFooter>
            </div>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
