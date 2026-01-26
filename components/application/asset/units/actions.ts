"use server";

import prisma from "@/lib/prisma";
import { unitDataInclude } from "@/lib/types";
import { UnitSchema, unitSchema } from "@/lib/validations";
import { cache } from "react";

async function allUnits() {
  return await prisma.unit.findMany({
    include: unitDataInclude,
  });
}
export const getAllUnits = cache(allUnits);

async function allAssetUnits(assetId: string) {
  return await prisma.unit.findMany({
    where: { assetId },
    include: unitDataInclude,
  });
}
export const getAllAssetUnits = cache(allAssetUnits);

async function unitById(id: string) {
  return await prisma.unit.findFirst({
    where: { id },
    include: unitDataInclude,
  });
}
export const getUnitById = cache(unitById);

export async function upsertUnit(input: UnitSchema) {
  const { id, assetId, name, status, rent } = unitSchema.parse(input);
  // apply auth
  return await prisma.unit.upsert({
    where: { id },
    create: {
      assetId,
      name,
      status,
      rent,
    },
    update: {
      assetId,
      name,
      status,
      rent,
    },
    include: unitDataInclude,
  });
}
