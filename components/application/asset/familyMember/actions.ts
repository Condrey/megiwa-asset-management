"use server";

import { DEFAULT_PASSWORD } from "@/lib/constants";
import { Role } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { familyMemberDataInclude } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { familyMemberSchema, FamilyMemberSchema } from "@/lib/validations";
import { cache } from "react";
import { upsertManager } from "../../management/action";

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
  allFamilyMembersOwningAsset,
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
      await upsertManager({
        email: email!,
        name: fullName,
        password: DEFAULT_PASSWORD,
        role: Role.FAMILY_MEMBER,
        username: slugify(fullName + "-" + contact),
      });
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
    { maxWait: 18000, timeout: 18000 },
  );
}
