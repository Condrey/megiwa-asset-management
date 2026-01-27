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
import { Invoice } from "@/lib/generated/prisma/client";
import { PaymentData } from "@/lib/types";
import { PaymentSchema, paymentSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import FieldPaidOnDate from "./field-paid-on-date";
import { useUpsertPaymentMutation } from "./mutations";

interface Props {
  payment?: PaymentData;
  invoice: Invoice;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
export default function FormAddEditPayment({
  payment,
  invoice,
  open,
  onOpenChange,
}: Props) {
  const form = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      id: payment?.id || "",
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      amount: payment?.amount!,
      method: payment?.method || "",
      invoiceId: payment?.invoiceId || invoice.id || "",
      paidOn: payment?.paidOn || new Date(),
      status: payment?.status || "PENDING",
    },
  });
  const { mutate, isPending } = useUpsertPaymentMutation(invoice.leaseId);
  function submitForm(input: PaymentSchema) {
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
              {payment ? "Update" : "Create a new"} Payment
            </SheetTitle>
          </SheetHeader>
          <Form {...form}>
            {/* <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
            <pre>{JSON.stringify(form.watch(), null, 2)}</pre> */}

            <div className="space-y-6 p-3 w-fit md:w-md lg:w-lg">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Amount</FormLabel>
                    <FormControl>
                      <NumberInput placeholder="enter amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Method</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter payment method"
                        {...field}
                        value={field.value!}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FieldPaidOnDate form={form} />
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
                  {payment ? "Update payment" : "Create payment"}
                </LoadingButton>
              </FormFooter>
            </div>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
