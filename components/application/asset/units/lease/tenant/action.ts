"use server";

import prisma from "@/lib/prisma";
import { tenantDataInclude } from "@/lib/types";
import { cache } from "react";

async function allTenants() {
  return await prisma.tenant.findMany({ include: tenantDataInclude });
}
export const getAllTenants = cache(allTenants);

async function tenantById(id: string) {
  return await prisma.tenant.findUnique({
    where: { id },
    include: tenantDataInclude,
  });
}
export const getTenantById = cache(tenantById);
