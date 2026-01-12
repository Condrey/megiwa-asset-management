import {
  AssetLegalStatus,
  AssetType,
  Gender,
  PropertyStatus,
} from "@/lib/generated/prisma/enums";
import {
  ArchiveRestoreIcon,
  ArchiveXIcon,
  Building2Icon,
  BuildingIcon,
  BusIcon,
  CitrusIcon,
  CoinsIcon,
  HandCoinsIcon,
  LandPlotIcon,
  LucideIcon,
  MilestoneIcon,
  ScaleIcon,
  StampIcon,
  StarsIcon,
  WrenchIcon,
} from "lucide-react";

export const assetTypes: Record<
  AssetType,
  { title: string; icon: LucideIcon }
> = {
  LAND: {
    title: "Land",
    icon: LandPlotIcon,
  },
  RESIDENTIAL: {
    title: "Residential Building",
    icon: Building2Icon,
  },
  COMMERCIAL: {
    title: "Commercial Building",
    icon: BuildingIcon,
  },
  SHOP: {
    title: "Shop",
    icon: CoinsIcon,
  },
  FARM: {
    title: "Farm",
    icon: CitrusIcon,
  },
  VEHICLE: {
    title: "Vehicle",
    icon: BusIcon,
  },
  MACHINERY: {
    title: "Machine",
    icon: WrenchIcon,
  },
};

export const assetLegalStatuses: Record<
  AssetLegalStatus,
  {
    title: string;
    icon: LucideIcon;
    variant:
      | "default"
      | "secondary"
      | "destructive"
      | "outline"
      | "success"
      | "warning";
  }
> = {
  CLEAN: {
    title: "Clean state",
    icon: StarsIcon,
    variant: "success",
  },
  DISPUTED: {
    title: "Has disputes",
    icon: ScaleIcon,
    variant: "destructive",
  },
  MORTGAGED: {
    title: "Is Mortgaged",
    icon: HandCoinsIcon,
    variant: "warning",
  },
  RESTRICTED: {
    title: "Restricted asset",
    icon: MilestoneIcon,
    variant: "warning",
  },
  SOLD: {
    title: "Sold asset",
    icon: StampIcon,
    variant: "default",
  },
};

export const allGenders = Object.values(Gender);
export const allPropertyStatuses = Object.values(PropertyStatus);
export const propertyStatuses: Record<
  PropertyStatus,
  {
    title: string;
    icon: LucideIcon;
    variant:
      | "default"
      | "secondary"
      | "destructive"
      | "success"
      | "warning"
      | "outline"
      | null
      | undefined;
  }
> = {
  OCCUPIED: {
    title: "Is Occupied",
    variant: "destructive",
    icon: ArchiveRestoreIcon,
  },
  VACANT: {
    title: "Is Vacant",
    variant: "success",
    icon: ArchiveXIcon,
  },
  UNDER_MAINTENANCE: {
    title: "Under Maintenance",
    variant: "warning",
    icon: WrenchIcon,
  },
};
