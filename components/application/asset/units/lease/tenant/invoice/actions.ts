"use server";

import prisma from "@/lib/prisma";
import { invoiceDataInclude } from "@/lib/types";
import { InvoiceSchema, invoiceSchema } from "@/lib/validations";
import { cache } from "react";

async function allInvoices() {
  return await prisma.invoice.findMany({ include: invoiceDataInclude });
}
export const getAllInvoices = cache(allInvoices);

async function allLeaseInvoices(leaseId: string) {
  return await prisma.invoice.findMany({
    where: { leaseId },
    include: invoiceDataInclude,
  });
}
export const getAllLeaseInvoices = cache(allLeaseInvoices);

export async function upsertInvoice(input: InvoiceSchema) {
  const { id, leaseId, amount, dueDate, period, status } =
    invoiceSchema.parse(input);
  // apply auth
  return await prisma.invoice.upsert({
    where: { id },
    create: {
      leaseId,
      amount,
      dueDate,
      period,
      status,
    },
    update: {
      leaseId,
      amount,
      dueDate,
      period,
      status,
    },
    include: invoiceDataInclude,
  });
}
