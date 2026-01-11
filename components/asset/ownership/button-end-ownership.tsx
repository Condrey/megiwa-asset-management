"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Asset } from "@/lib/generated/prisma/client";
import { OwnershipData } from "@/lib/types";
import { useState } from "react";
import FormEndOwnership from "./form-end-ownership";

interface Props extends ButtonProps {
  asset: Asset;
  ownership: OwnershipData;
}
export default function ButtonEndOwnership({
  asset,
  ownership,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button {...props} onClick={() => setOpen(true)} />
      <FormEndOwnership
        asset={asset}
        ownership={ownership}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
