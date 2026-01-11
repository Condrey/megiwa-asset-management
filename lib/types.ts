import { Prisma } from "./generated/prisma/client";
import {
  AssetGroupByOutputType,
  PickEnumerable,
} from "./generated/prisma/internal/prismaNamespace";

// Family Member
export const familyMemberDataInclude = {
  father: true,
  mother: true,
} satisfies Prisma.FamilyMemberInclude;
export type FamilyMemberData = Prisma.FamilyMemberGetPayload<{
  include: typeof familyMemberDataInclude;
}>;

// Ownerships
export const ownershipDataInclude = {
  asset: {
    include: {
      inheritanceEvents: { select: { beneficiaries: true, deceasedId: true } },
    },
  },
  member: { include: familyMemberDataInclude },
} satisfies Prisma.OwnershipInclude;
export type OwnershipData = Prisma.OwnershipGetPayload<{
  include: typeof ownershipDataInclude;
}>;

// Inheritance Beneficiary
export const inheritanceBeneficiaryDataInclude = {
  event: {
    include: {
      asset: {
        include: {
          ownerships: true,
          inheritanceEvents: { select: { beneficiaries: true } },
        },
      },
      deceased: { include: { father: true, mother: true } },
    },
  },
  member: { include: familyMemberDataInclude },
} satisfies Prisma.InheritanceBeneficiaryInclude;
export type InheritanceBeneficiaryData =
  Prisma.InheritanceBeneficiaryGetPayload<{
    include: typeof inheritanceBeneficiaryDataInclude;
  }>;

// Inheritance Event
export const inheritanceEventDataInclude = {
  beneficiaries: { include: inheritanceBeneficiaryDataInclude },
  asset: {
    include: {
      ownerships: true,
      inheritanceEvents: { select: { beneficiaries: true } },
    },
  },
  deceased: { include: familyMemberDataInclude },
} satisfies Prisma.InheritanceEventInclude;
export type InheritanceEventData = Prisma.InheritanceEventGetPayload<{
  include: typeof inheritanceEventDataInclude;
}>;

// Asset
export const assetDataInclude = {
  valuations: true,
  units: true,
  documents: true,
  expenses: true,
  incomes: true,
  inheritanceEvents: { include: inheritanceEventDataInclude },
  legalCases: true,
  ownerships: {
    include: ownershipDataInclude,
    orderBy: [{ share: "desc" }, { startDate: "desc" }],
  },
} satisfies Prisma.AssetInclude;
export type AssetData = Prisma.AssetGetPayload<{
  include: typeof assetDataInclude;
}>;

export const groupedAssetByTypeData = {
  by: "type",
  _count: { type: true, _all: true },
  orderBy: { type: "asc" },
} satisfies Prisma.AssetGroupByArgs;
export type GroupedAssetByTypeData = PickEnumerable<
  AssetGroupByOutputType,
  "type"
> & {
  _count: {
    type: number;
    _all: number;
  };
};

// Breadcrumb
export type BreadcrumbItem = {
  title: string;
  href?: string;
};
