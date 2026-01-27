"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Invoice } from "@/lib/generated/prisma/client";
import { PaymentData } from "@/lib/types";
import { useState } from "react";
import FormAddEditPayment from "./form-add-edit-payment";

interface Props extends ButtonProps {
  payment?: PaymentData;
  invoice: Invoice;
}
export default function ButtonAddEditPayment({
  payment,
  invoice,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        title={payment ? "Update payment" : "Create a payment"}
        {...props}
        onClick={() => setOpen(true)}
      />
      <FormAddEditPayment
        payment={payment}
        invoice={invoice}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
