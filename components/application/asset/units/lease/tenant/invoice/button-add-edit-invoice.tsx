"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Lease } from "@/lib/generated/prisma/client";
import { InvoiceData } from "@/lib/types";
import { useState } from "react";
import FormAddEditInvoice from "./form-add-edit-invoice";

interface Props extends ButtonProps {
  invoice?: InvoiceData;
  lease: Lease;
}
export default function ButtonAddEditInvoice({
  invoice,
  lease,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        title={invoice ? "Update invoice" : "Create a invoice"}
        {...props}
        onClick={() => setOpen(true)}
      />
      <FormAddEditInvoice
        invoice={invoice}
        lease={lease}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
