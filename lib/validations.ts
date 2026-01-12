import z from "zod";
import { Gender, PropertyStatus } from "./generated/prisma/enums";
const requiredString = z.string().trim();

// Family Member
export const familyMemberSchema = z.object({
  id: z.string().optional().describe("a random UUIDv4"),
  fullName: requiredString.min(
    1,
    "Your name can not be empty, please add a value"
  ),
  contact: z.string().optional().nullable(),
  email: z.email().optional().nullable(),
  gender: z.enum(Gender, { error: "Please choose a gender" }),
  dateOfBirth: z.date().optional().nullable(),
  dateOfDeath: z.date().optional().nullable(),
  fatherId: z.string().optional().nullable(),
  motherId: z.string().optional().nullable(),
});
export type FamilyMemberSchema = z.infer<typeof familyMemberSchema>;

// Ownership
export const ownershipSchema = z.object({
  id: z.string().optional().describe("a random UUIDv4"),
  assetId: requiredString.min(
    1,
    "Please make sure an asset is chosen before assigning an owner"
  ),
  memberId: requiredString.min(1, "Please choose a member"),
  share: z.number({ error: "Enter a valid percentage" }),
  startDate: z.date({ error: "Please include a start date" }),
  endDate: z.date().optional().nullable(),
});
export const createOwnershipSchema = (maxShare: number) =>
  z.object({
    id: z.string().optional().describe("a random UUIDv4"),
    assetId: requiredString.min(
      1,
      "Please make sure an asset is chosen before assigning an owner"
    ),
    memberId: requiredString.min(1, "Please choose a member"),
    // enforce 0 <= share <= maxShare
    share: z
      .number({ error: "Enter a valid percentage" })
      .min(0, { message: "Share percentage value must be at least 0" })
      .max(maxShare, {
        message: `The value entered is greater than the remaining shares. Share must be at most ${maxShare}`,
      }),
    startDate: z.date({ error: "Please include a start date" }),
    endDate: z.date().optional().nullable(),
  });

// Default schema that matches previous behavior but caps share at 100.
export const ownershipSchemaWithDefaultMax = createOwnershipSchema(100);
export type OwnershipSchema = z.infer<typeof ownershipSchemaWithDefaultMax>;

// Inheritance Event
export const inheritanceEventSchema = z.object({
  id: z.string().optional().describe("a random UUIDv4"),
  assetId: requiredString.min(
    1,
    "Please make sure an asset is chosen before assigning an owner"
  ),
  deceasedId: requiredString.min(1, "Please select a deceased member"),
  eventDate: z.date({ error: "Please enter an event date." }),
  notes: z.string().optional(),
});
export type InheritanceEventSchema = z.infer<typeof inheritanceEventSchema>;

// Inheritance Beneficiary
export const createInheritanceBeneficiarySchema = z.object({
  id: z.string().optional().describe("a random UUIDv4"),
  eventId: requiredString.min(1, "Please choose an inheritance event first."),
  memberId: requiredString.min(1, "Please choose a member"),
  // enforce 0 <= share <= maxShare
  share: z
    .number({ error: "Enter a valid percentage" })
    .min(0, { message: "Share percentage value must be at least 0" })
    .max(100, {
      message: `The value entered is greater than the remaining shares. Share must be at most ${100}`,
    }),
});
export const inheritanceBeneficiarySchema = (maxShare: number) =>
  z.object({
    id: z.string().optional().describe("a random UUIDv4"),
    eventId: requiredString.min(1, "Please choose an inheritance event first."),
    memberId: requiredString.min(1, "Please choose a member"),
    // enforce 0 <= share <= maxShare
    share: z
      .number({ error: "Enter a valid percentage" })
      .min(0, { message: "Share percentage value must be at least 0" })
      .max(maxShare, {
        message: `The value entered is greater than the remaining shares. Share must be at most ${maxShare}`,
      }),
  });
export const inheritanceBeneficiarySchemaWithDefaultMax =
  createInheritanceBeneficiarySchema;
export type InheritanceBeneficiarySchema = z.infer<
  typeof inheritanceBeneficiarySchemaWithDefaultMax
>;

// Unit
export const unitSchema = z.object({
  id: z.string().optional().describe("a random UUIDv4"),
  assetId: requiredString.min(
    1,
    "Please make sure an asset is chosen before assigning an owner"
  ),
  name: requiredString.min(1, "Please provide a name to the unit"),
  rent: z.number({ error: "How much is the rent?" }).optional(),
  status: z.enum(PropertyStatus, { error: "Choose a property status" }),
});
export type UnitSchema = z.infer<typeof unitSchema>;

// Valuation
export const valuationSchema = z.object({
  id: z.string().optional().describe("a random UUIDv4"),
  assetId: requiredString.min(
    1,
    "Please make sure an asset is chosen before assigning an owner"
  ),
  value: z.number({ error: "Please include a value" }),
  valuedOn: z.date({ error: "Please provide a date of value addition" }),
});
export type ValuationSchema = z.infer<typeof valuationSchema>;

// miscellaneous
export const emailSchema = z.object({ email: z.string().trim().email() });
export type EmailSchema = z.infer<typeof emailSchema>;

export const singleContentSchema = z.object({ singleContent: requiredString });
export type SingleContentSchema = z.infer<typeof singleContentSchema>;
