"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Asset } from "@/lib/generated/prisma/client";
import { UnitData } from "@/lib/types";
import { useState } from "react";
import FormEndUnit from "./form-add-edit-unit";

interface Props extends ButtonProps {
  asset: Asset;
  unit?: UnitData;
}
export default function ButtonAddEditUnit({ asset, unit, ...props }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        title={unit ? "Update unit" : "Create a unit"}
        {...props}
        onClick={() => setOpen(true)}
      />
      <FormEndUnit
        asset={asset}
        unit={unit}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
