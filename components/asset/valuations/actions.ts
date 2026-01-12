"use server";

import prisma from "@/lib/prisma";
import { valuationDataInclude } from "@/lib/types";
import { ValuationSchema, valuationSchema } from "@/lib/validations";
import { cache } from "react";

async function allValuations() {
  return await prisma.valuation.findMany({
    include: valuationDataInclude,
  });
}
export const getAllValuations = cache(allValuations);

async function allAssetValuations(assetId: string) {
  return await prisma.valuation.findMany({
    where: { assetId },
    include: valuationDataInclude,
  });
}
export const getAllAssetValuations = cache(allAssetValuations);

export async function upsertValuation(input: ValuationSchema) {
  const { id, assetId, value, valuedOn } = valuationSchema.parse(input);
  // apply auth
  return await prisma.valuation.upsert({
    where: { id },
    create: {
      assetId,
      value,
      valuedOn,
    },
    update: {
      assetId,
      value,
      valuedOn,
    },
    include: valuationDataInclude,
  });
}
