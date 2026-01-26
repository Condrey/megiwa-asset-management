"use server";

import prisma from "@/lib/prisma";
import { leaseDataInclude } from "@/lib/types";
import { LeaseSchema, leaseSchema } from "@/lib/validations";
import { cache } from "react";

async function allLeases() {
  return await prisma.lease.findMany({ include: leaseDataInclude });
}
export const getAllLeases = cache(allLeases);

async function allUnitLeases(unitId: string) {
  return await prisma.lease.findMany({
    where: { unitId },
    orderBy: { createdAt: "desc" },
    include: leaseDataInclude,
  });
}
export const getAllUnitLeases = cache(allUnitLeases);

export async function upsertLease(input: LeaseSchema) {
  const { id, rent, startDate, tenantId, unitId, endDate } =
    leaseSchema.parse(input);
  // apply auth
  return await prisma.lease.upsert({
    where: { id },
    create: {
      rent,
      startDate,
      tenantId,
      unitId,
      endDate,
    },
    update: {
      rent,
      startDate,
      tenantId,
      unitId,
      endDate,
    },
    include: leaseDataInclude,
  });
}
