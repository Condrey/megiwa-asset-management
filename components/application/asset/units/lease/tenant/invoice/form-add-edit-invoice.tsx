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
import { Lease } from "@/lib/generated/prisma/client";
import { InvoiceData } from "@/lib/types";
import { InvoiceSchema, invoiceSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import FieldDueDate from "./field-due-date";
import { useUpsertInvoiceMutation } from "./mutations";

interface Props {
  invoice?: InvoiceData;
  lease: Lease;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
export default function FormAddEditInvoice({
  invoice,
  lease,
  open,
  onOpenChange,
}: Props) {
  const form = useForm<InvoiceSchema>({
    resolver: zodResolver(invoiceSchema),
    values: {
      id: invoice?.id || "",
      amount: invoice?.amount || 0,
      dueDate: invoice?.dueDate || lease.endDate!,
      leaseId: invoice?.leaseId || lease.id || "",
      period: invoice?.period || "",
      status: invoice?.status || "PENDING",
    },
  });
  const { mutate, isPending } = useUpsertInvoiceMutation(lease.id);
  function submitForm(input: InvoiceSchema) {
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
              {invoice ? "Update" : "Create a new"} Invoice
            </SheetTitle>
          </SheetHeader>
          <Form {...form}>
            {/* <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
            <pre>{JSON.stringify(form.watch(), null, 2)}</pre> */}

            <div className="space-y-6 p-3 w-fit md:w-md lg:w-lg">
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Period</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter period"
                        {...field}
                        value={field.value!}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Total amount</FormLabel>
                    <FormControl>
                      <NumberInput
                        placeholder="enter total amount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FieldDueDate form={form} />
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
                  {invoice ? "Update invoice" : "Create invoice"}
                </LoadingButton>
              </FormFooter>
            </div>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
