"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { TenantData } from "@/lib/types";
import { useState } from "react";
import FormAddEditTenant from "./form-add-edit-tenant";

interface Props extends ButtonProps {
  tenant?: TenantData;
}
export default function ButtonAddEditTenant({ tenant, ...props }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        title={tenant ? "Update tenant" : "Create a tenant"}
        {...props}
        onClick={() => setOpen(true)}
      />
      <FormAddEditTenant tenant={tenant} open={open} onOpenChange={setOpen} />
    </>
  );
}
