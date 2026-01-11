"use server";

import prisma from "@/lib/prisma";
import { ownershipDataInclude } from "@/lib/types";
import { OwnershipSchema, ownershipSchema } from "@/lib/validations";
import { cache } from "react";

async function allOwnerships() {
  return await prisma.ownership.findMany({
    include: ownershipDataInclude,
  });
}
export const getAllOwnerships = cache(allOwnerships);

async function allAssetOwnerships(assetId: string) {
  return await prisma.ownership.findMany({
    where: { assetId },
    include: ownershipDataInclude,
  });
}
export const getAllAssetOwnerships = cache(allAssetOwnerships);

export async function upsertOwnership(input: OwnershipSchema) {
  const { id, memberId, assetId, share, startDate, endDate } =
    ownershipSchema.parse(input);
  // apply auth
  return await prisma.ownership.upsert({
    where: { id },
    create: {
      memberId,
      assetId,
      share: !endDate ? share : 0,
      startDate,
      endDate,
      previousShare: share,
    },
    update: {
      memberId,
      assetId,
      share: !endDate ? share : 0,
      startDate,
      endDate,
      previousShare: share,
    },
    include: ownershipDataInclude,
  });
}

export async function endOwnership(input: OwnershipSchema) {
  const { id, endDate } = ownershipSchema.parse(input);
  // apply auth
  return await prisma.ownership.update({
    where: { id },
    data: {
      share: 0,
      endDate,
    },
    include: ownershipDataInclude,
  });
}
