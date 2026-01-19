"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { UserDataSelect } from "@/lib/types";
import { useState } from "react";
import FormAddEditManager from "./form-add-edit-manager";

interface Props extends ButtonProps {
  manager?: UserDataSelect;
}
export default function ButtonAddEditManager({
  manager,
  type,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type={type || "button"}
        title={manager ? "Edit manager" : "Create a new manager."}
        {...props}
        onClick={() => setOpen(true)}
      />
      <FormAddEditManager
        open={open}
        onOpenChange={setOpen}
        manager={manager}
      />
    </>
  );
}
