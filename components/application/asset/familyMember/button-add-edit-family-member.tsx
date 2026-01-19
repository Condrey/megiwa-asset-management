"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { FamilyMemberData } from "@/lib/types";
import { useState } from "react";
import FormAddEditFamilyMember from "./form-add-edit-family-member";

interface Props extends ButtonProps {
  familyMember?: FamilyMemberData;
}
export default function ButtonAddEditFamilyMember({
  familyMember,
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
      <FormAddEditFamilyMember
        open={open}
        onOpenChange={setOpen}
        familyMember={familyMember}
      />
    </>
  );
}
