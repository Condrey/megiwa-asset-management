"use server";

import prisma from "@/lib/prisma";
import { inheritanceEventDataInclude } from "@/lib/types";
import {
  inheritanceEventSchema,
  InheritanceEventSchema,
} from "@/lib/validations";
import { cache } from "react";

async function allInheritanceEvents() {
  return await prisma.inheritanceEvent.findMany({
    include: inheritanceEventDataInclude,
  });
}
export const getAllInheritanceEvents = cache(allInheritanceEvents);

export async function upsertInheritanceEvent(input: InheritanceEventSchema) {
  const { id, assetId, deceasedId, eventDate, notes } =
    inheritanceEventSchema.parse(input);
  // apply auth
  return await prisma.$transaction(
    async (tx) => {
      // When the inheritance event is created for an owner, register them as deceased
      // Additionally, remove all their ever registered beneficiary shares
      await tx.familyMember.update({
        where: { id: deceasedId },
        data: {
          isDeceased: true,
          inheritanceBeneficiaries: {
            updateMany: { where: { memberId: id }, data: { share: 0 } },
          },
        },
      });
      return await tx.inheritanceEvent.upsert({
        where: { id },
        create: {
          assetId,
          deceasedId,
          eventDate,
          notes,
        },
        update: {
          assetId,
          deceasedId,
          eventDate,
          notes,
        },
        include: inheritanceEventDataInclude,
      });
    },
    { maxWait: 18000, timeout: 18000 }
  );
}
