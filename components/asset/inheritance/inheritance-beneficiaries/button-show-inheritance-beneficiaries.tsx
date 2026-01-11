"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { InheritanceEventData } from "@/lib/types";
import { useState } from "react";
import ListOfInheritanceBeneficiaries from "./list-of-beneficiaries";

interface Props extends ButtonProps {
  inheritanceEvent: InheritanceEventData;
}
export default function ButtonShowInheritanceBeneficiaries({
  inheritanceEvent,
  type,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type={type || "button"} {...props} />
      </SheetTrigger>
      <SheetContent side="top" className="h-dvh overflow-y-auto scroll-auto">
        <ListOfInheritanceBeneficiaries
          className="max-w-7xl  mx-auto"
          event={inheritanceEvent}
        />
      </SheetContent>
    </Sheet>
  );
}
