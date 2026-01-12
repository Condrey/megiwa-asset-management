"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Asset } from "@/lib/generated/prisma/client";
import { ValuationData } from "@/lib/types";
import { useState } from "react";
import FormEndValuation from "./form-add-edit-valuation";

interface Props extends ButtonProps {
  asset: Asset;
  valuation?: ValuationData;
}
export default function ButtonAddEditValuation({
  asset,
  valuation,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        title={valuation ? "Update valuation" : "Create a valuation"}
        {...props}
        onClick={() => setOpen(true)}
      />
      <FormEndValuation
        asset={asset}
        valuation={valuation}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
