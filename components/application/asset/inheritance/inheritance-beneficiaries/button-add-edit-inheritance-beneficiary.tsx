"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { InheritanceBeneficiaryData, InheritanceEventData } from "@/lib/types";
import { useState } from "react";
import FormAddEditInheritanceBeneficiary from "./form-add-edit-inheritance-beneficiary";

interface Props extends ButtonProps {
  inheritanceBeneficiary?: InheritanceBeneficiaryData;
  event: InheritanceEventData;
  ownershipEnded: boolean;
  shareholderShare: number;
  allShares: number;
}
export default function ButtonAddEditInheritanceBeneficiary({
  event,
  inheritanceBeneficiary,
  ownershipEnded,
  shareholderShare,
  allShares,
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
      <FormAddEditInheritanceBeneficiary
        event={event}
        ownershipEnded={ownershipEnded}
        shareholderShare={shareholderShare}
        allShares={allShares}
        open={open}
        onOpenChange={setOpen}
        inheritanceBeneficiary={inheritanceBeneficiary}
      />
    </>
  );
}
