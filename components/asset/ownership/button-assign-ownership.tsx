"use client";

import ErrorContainer from "@/components/query-container/error-container";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Asset } from "@/lib/generated/prisma/client";
import { OwnershipData } from "@/lib/types";
import { useState } from "react";
import { useFamilyMembersQuery } from "../familyMember/query";
import FormAssignOwnership from "./form-assign-ownership";
import { useAllAssetOwnershipsQuery } from "./query";

interface Props extends ButtonProps {
  asset: Asset;
  ownership?: OwnershipData;
}
export default function ButtonAssignOwnership({
  asset,
  ownership,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  const query = useFamilyMembersQuery();
  const { data: assetOwnerships } = useAllAssetOwnershipsQuery(asset.id);
  const { data: familyMembers, status } = query;

  if (status === "pending") {
    return <Skeleton className={buttonVariants()} />;
  }
  if (status === "error") {
    return <ErrorContainer errorMessage="" query={query} />;
  }

  return (
    <>
      <Button {...props} onClick={() => setOpen(true)} />
      <FormAssignOwnership
        asset={asset}
        ownership={ownership}
        assetOwnerships={assetOwnerships}
        familyMembers={familyMembers}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
