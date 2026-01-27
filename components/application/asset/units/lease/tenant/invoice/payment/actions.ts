"use server";

import prisma from "@/lib/prisma";
import { paymentDataInclude } from "@/lib/types";
import { PaymentSchema, paymentSchema } from "@/lib/validations";
import { cache } from "react";

async function allPayments() {
  return await prisma.payment.findMany({ include: paymentDataInclude });
}
export const getAllPayments = cache(allPayments);

async function allInvoicePayments(invoiceId: string) {
  return await prisma.payment.findMany({
    where: { invoiceId },
    include: paymentDataInclude,
  });
}
export const getAllInvoicePayments = cache(allInvoicePayments);

export async function upsertPayment(input: PaymentSchema) {
  const { id, invoiceId, amount, method, paidOn, status } =
    paymentSchema.parse(input);
  // apply auth
  return await prisma.payment.upsert({
    where: { id },
    create: {
      invoiceId,
      amount,
      method,
      paidOn,
      status,
    },
    update: {
      invoiceId,
      amount,
      method,
      paidOn,
      status,
    },
    include: paymentDataInclude,
  });
}
