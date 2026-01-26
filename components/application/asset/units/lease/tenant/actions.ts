"use server";

import prisma from "@/lib/prisma";
import { tenantDataInclude } from "@/lib/types";
import { TenantSchema, tenantSchema } from "@/lib/validations";

export async function upsertTenant(input: TenantSchema) {
  const { id, fullName, contact, email } = tenantSchema.parse(input);
  // apply auth
  await prisma.tenant.upsert({
    where: { id },
    create: {
      fullName,
      contact,
      email,
    },
    update: {
      fullName,
      contact,
      email,
    },
    include: tenantDataInclude,
  });
}
