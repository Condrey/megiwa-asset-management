"use server";

import prisma from "@/lib/prisma";
import { familyMemberDataInclude } from "@/lib/types";
import { familyMemberSchema, FamilyMemberSchema } from "@/lib/validations";
import { cache } from "react";

async function allFamilyMembers() {
  return await prisma.familyMember.findMany({
    include: familyMemberDataInclude,
  });
}
export const getAllFamilyMembers = cache(allFamilyMembers);

async function allFamilyMembersOwningAsset(assetId: string) {
  return await prisma.familyMember.findMany({
    where: { ownerships: { some: { assetId } } },
    include: familyMemberDataInclude,
  });
}
export const getAllFamilyMembersOwningAsset = cache(
  allFamilyMembersOwningAsset
);

export async function upsertFamilyMember(input: FamilyMemberSchema) {
  const {
    id,
    fullName,
    contact,
    dateOfBirth,
    dateOfDeath,
    email,
    fatherId,
    gender,
    motherId,
  } = familyMemberSchema.parse(input);
  // apply auth

  const isDeceased = !!dateOfDeath;
  return await prisma.$transaction(
    async (tx) => {
      // Check if this member is deceased and remove all beneficiary shares
      if (isDeceased) {
        await tx.inheritanceBeneficiary.updateMany({
          where: { memberId: id },
          data: { share: 0 },
        });
      }
      return await tx.familyMember.upsert({
        where: { id },
        create: {
          fullName,
          contact,
          dateOfBirth,
          dateOfDeath,
          email,
          fatherId,
          gender,
          motherId,
          isDeceased,
        },
        update: {
          fullName,
          contact,
          dateOfBirth,
          dateOfDeath,
          email,
          fatherId,
          gender,
          motherId,
          isDeceased,
        },
        include: familyMemberDataInclude,
      });
    },
    { maxWait: 18000, timeout: 18000 }
  );
}
