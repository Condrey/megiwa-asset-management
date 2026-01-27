"use client";

import Container from "@/components/container";
import { TypographyH2 } from "@/components/headings";
import { Button, ButtonProps } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { InvoiceData } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import ButtonAddEditPayment from "./button-add-edit-invoice";
import { ListOfPayments } from "./list-of-payments";

interface Props extends ButtonProps {
  invoice: InvoiceData;
}
export default function ButtonShowPayments({ invoice, ...props }: Props) {
  const [open, setOpen] = useState(false);
  const {
    lease: {
      rent,
      unit: { name: unitName, rent: unitRent },
    },
    payments,
  } = invoice;
  const isSameRentAmount = unitRent === rent;
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          title={"Show payments"}
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
              Invoice price{" "}
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
            <ButtonAddEditPayment invoice={invoice}>
              <PlusIcon /> Payment
            </ButtonAddEditPayment>
          </TypographyH2>
          <ListOfPayments
            invoice={invoice}
            payments={payments}
            className="h-dvh"
          />
        </Container>
      </SheetContent>
    </Sheet>
  );
}
