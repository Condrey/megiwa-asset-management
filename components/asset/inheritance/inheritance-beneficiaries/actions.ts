"use server";

import prisma from "@/lib/prisma";
import { inheritanceBeneficiaryDataInclude } from "@/lib/types";
import {
  createInheritanceBeneficiarySchema,
  InheritanceBeneficiarySchema,
} from "@/lib/validations";
import { cache } from "react";

async function allInheritanceEventBeneficiaries(eventId: string) {
  return await prisma.inheritanceBeneficiary.findMany({
    where: { eventId },
    include: inheritanceBeneficiaryDataInclude,
  });
}
export const getAllInheritanceEventBeneficiaries = cache(
  allInheritanceEventBeneficiaries
);

export async function upsertInheritanceBeneficiary(
  input: InheritanceBeneficiarySchema
) {
  const { id, eventId, memberId, share } =
    createInheritanceBeneficiarySchema.parse(input);
  // apply auth
  return await prisma.inheritanceBeneficiary.upsert({
    where: { id },
    create: {
      eventId,
      memberId,
      share,
    },
    update: {
      eventId,
      memberId,
      share,
    },
    include: inheritanceBeneficiaryDataInclude,
  });
}
