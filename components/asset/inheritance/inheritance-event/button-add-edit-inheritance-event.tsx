"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Asset } from "@/lib/generated/prisma/client";
import { InheritanceEventData } from "@/lib/types";
import { useState } from "react";
import FormAddEditInheritanceEvent from "./form-add-edit-inheritance-event";

interface Props extends ButtonProps {
  inheritanceEvent?: InheritanceEventData;
  asset: Asset;
}
export default function ButtonAddEditInheritanceEvent({
  asset,
  inheritanceEvent,
  type,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type={type || "button"}
        {...props}
        onClick={() => setOpen(true)}
      />
      <FormAddEditInheritanceEvent
        asset={asset}
        open={open}
        onOpenChange={setOpen}
        inheritanceEvent={inheritanceEvent}
      />
    </>
  );
}
