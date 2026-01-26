"use client";

import Container from "@/components/container";
import { TypographyH2 } from "@/components/headings";
import { Button, ButtonProps } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LeaseData } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import ButtonAddEditInvoice from "./button-add-edit-invoice";
import { ListOfInvoices } from "./list-of-invoices";

interface Props extends ButtonProps {
  lease: LeaseData;
}
export default function ButtonShowInvoices({ lease, ...props }: Props) {
  const [open, setOpen] = useState(false);
  const {
    invoices,
    rent,
    unit: { name: unitName, rent: unitRent },
  } = lease;
  const isSameRentAmount = unitRent === rent;
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          title={"Show invoices"}
          {...props}
          onClick={() => setOpen(true)}
        />
      </SheetTrigger>
      <SheetContent side="top">
        <Container>
          <TypographyH2
            text={unitName}
            className="flex gap-3 flex-wrap w-full justify-between"
          >
            <p className="slashed-zero font-mono space-x-2">
              Lease price{" "}
              <span
                className={cn(
                  !isSameRentAmount && "line-through text-muted-foreground",
                )}
              >
                {formatCurrency(unitRent || 0, "Ugx", true)}
              </span>
              {!isSameRentAmount && (
                <span className="slashed-zero">
                  {formatCurrency(rent, "Ugx", true)}
                </span>
              )}
            </p>
            <ButtonAddEditInvoice lease={lease}>
              <PlusIcon /> Invoice
            </ButtonAddEditInvoice>
          </TypographyH2>
          <ListOfInvoices invoices={invoices} lease={lease} className="h-dvh" />
        </Container>
      </SheetContent>
    </Sheet>
  );
}
