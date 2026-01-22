"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { AssetType } from "@/lib/generated/prisma/enums";
import { AssetData } from "@/lib/types";
import { useState } from "react";
import FormAddEditAsset from "./form-add-edit-asset";

interface Props extends ButtonProps {
  asset?: AssetData;
  assetType?: AssetType;
}
export default function ButtonAddEditAsset({
  asset,
  assetType,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        title={asset ? "Update asset" : "Create asset"}
        {...props}
        onClick={() => setOpen(true)}
      />
      <FormAddEditAsset
        asset={asset}
        open={open}
        onOpenChange={setOpen}
        assetType={assetType}
      />
    </>
  );
}
