"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Unit } from "@/lib/generated/prisma/client";
import { LeaseData } from "@/lib/types";
import { useState } from "react";
import FormAddEditLease from "./form-add-edit-lease";

interface Props extends ButtonProps {
  unit: Unit;
  lease?: LeaseData;
}
export default function ButtonAddEditLease({ unit, lease, ...props }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        title={lease ? "Update lease" : "Create a lease"}
        {...props}
        onClick={() => setOpen(true)}
      />
      <FormAddEditLease
        unit={unit}
        lease={lease}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
