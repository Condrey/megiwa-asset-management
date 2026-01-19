"use server";

import prisma from "@/lib/prisma";
import { userDataSelect, UserDataSelect } from "@/lib/types";
import { signUpSchema, SignUpSchema } from "@/lib/validations";
import { hash } from "@node-rs/argon2";
import { cache } from "react";

async function allManagers() {
  return await prisma.user.findMany();
}

export const getAllManagers = cache(allManagers);

export async function insertManager(
  input: SignUpSchema
): Promise<string | UserDataSelect> {
  const { email, name, password, role, username } = signUpSchema.parse(input);
  // apply auth

  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const existingUserName = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
  });
  if (existingUserName) {
    return "Username is already taken, please select another";
  }
  const existingEmail = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
  });
  if (existingEmail) {
    return "Email is already taken or has been used to register before.";
  }

  return await prisma.user.create({
    data: { email, name, passwordHash, role, username },
    select: userDataSelect,
  });
}
