import { assetLegalStatuses, assetTypes } from "@/lib/constants";
import { AssetLegalStatus, AssetType } from "@/lib/generated/prisma/enums";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export function AssetTypeBadge({
  type,
  className,
}: {
  type: AssetType;
  className?: string;
}) {
  const { icon: AssetIcon, title: assetTitle } = assetTypes[type];

  return (
    <Badge variant={"secondary"} className={cn(className)}>
      <AssetIcon />
      {assetTitle}
    </Badge>
  );
}

export function AssetLegalStatusBadge({
  legalStatus,
  className,
}: {
  legalStatus: AssetLegalStatus;
  className?: string;
}) {
  const {
    icon: StatusIcon,
    title: statusTitle,
    variant: statusVariant,
  } = assetLegalStatuses[legalStatus];

  return (
    <Badge variant={statusVariant} className={cn(className)}>
      <StatusIcon />
      {statusTitle}
    </Badge>
  );
}
