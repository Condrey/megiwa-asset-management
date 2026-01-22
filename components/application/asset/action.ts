"use server";

import { AssetType } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { assetDataInclude } from "@/lib/types";
import { AssetSchema, assetSchema } from "@/lib/validations";
import { cache } from "react";

async function assetsByType(type: AssetType) {
  return await prisma.asset.findMany({ where: { type } });
}
export const getAssetsByType = cache(assetsByType);

async function groupedAssetsByType() {
  return await prisma.asset.groupBy({
    by: "type",
    _count: { type: true, _all: true },
    orderBy: { type: "asc" },
  });
}
export const getGroupedAssetsByType = cache(groupedAssetsByType);

async function assetById(id: string) {
  return await prisma.asset.findFirst({
    where: { id },
    include: assetDataInclude,
  });
}
export const getAssetById = cache(assetById);

export async function upsertAsset(input: AssetSchema) {
  const { id, legalStatus, location, name, type, retiredAt, size, createdAt } =
    assetSchema.parse(input);
  // apply auth
  return await prisma.asset.upsert({
    where: { id },
    create: {
      legalStatus,
      location,
      name,
      type,
      retiredAt,
      size,
      createdAt: createdAt!,
    },
    update: {
      legalStatus,
      location,
      name,
      type,
      retiredAt,
      size,
      createdAt: createdAt!,
    },
    include: assetDataInclude,
  });
}
