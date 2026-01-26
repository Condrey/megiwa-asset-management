import z from "zod";
import {
  AssetLegalStatus,
  AssetType,
  Gender,
  PaymentStatus,
  PropertyStatus,
  Role,
} from "./generated/prisma/enums";
const requiredString = z.string().trim();

// Signup
export const signUpSchema = z.object({
  email: z
    .email()
    .min(1, "Please an email is required")
    .describe("Email for signing up"),
  name: requiredString.min(1, "Please provide a name"),
  username: requiredString
    .min(1, "You need a username")
    .describe("User username for the user.")
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, - and _ are allowed"),
  password: requiredString
    .min(8, "Password must be at least 8 characters")
    .describe("Password for the user."),
  role: z.enum(Role, { error: "Please choose a correct role." }),
});
export type SignUpSchema = z.infer<typeof signUpSchema>;

// Login
export const loginSchema = z.object({
  username: requiredString.min(
    1,
    "Please input your username or email that you registered with.",
  ),
  password: requiredString
    .min(1, "Password is required to login")
    .describe("Password that you registered with."),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const verifyUserSchema = z.object({
  name: requiredString
    .min(1, "Name must be provided.")
    .transform((val) =>
      val.trim().replace(/\b\w/g, (char) => char.toUpperCase()),
    ),
  id: requiredString.min(1, "User id is missing"),
  username: requiredString
    .min(1, "Please add a user name")
    .describe("User username for the user.")
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, - and _ are allowed"),
  email: requiredString.email().min(1, "A working email is required"),
  password: requiredString
    .min(8, "Password must be at least 8 characters")
    .describe("Password for the user."),
});
export type VerifyUserSchema = z.infer<typeof verifyUserSchema>;

// Family Member
export const familyMemberSchema = z.object({
  id: z.string().optional().describe("a random UUIDv4"),
  fullName: requiredString.min(
    1,
    "Your name can not be empty, please add a value",
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
    "Please make sure an asset is chosen before assigning an owner",
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
      "Please make sure an asset is chosen before assigning an owner",
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
    "Please make sure an asset is chosen before assigning an owner",
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
    "Please make sure an asset is chosen before assigning an owner",
  ),
  name: requiredString.min(1, "Please provide a name to the unit"),
  rent: z.number({ error: "How much is the rent?" }).optional(),
  status: z.enum(PropertyStatus, { error: "Choose a property status" }),
});
export type UnitSchema = z.infer<typeof unitSchema>;

// Lease
export const leaseSchema = z.object({
  id: z.string().optional().describe("a random UUIDv4"),
  unitId: requiredString.min(
    1,
    "Please make sure a unit is chosen before assigning a lease",
  ),
  tenantId: requiredString.min(1, "Please choose a tenant"),
  rent: z.number({ error: "Please include a rent amount" }),
  startDate: z.date({ error: "Please include a start date" }),
  endDate: z.date().optional().nullable(),
});
export type LeaseSchema = z.infer<typeof leaseSchema>;

// Tenant
export const tenantSchema = z.object({
  id: z.string().optional().describe("a random UUIDv4"),
  fullName: requiredString.min(1, "The name is required"),
  contact: requiredString.min(1, "Tenant's contact is a must"),
  email: z.string().optional().nullable(),
});
export type TenantSchema = z.infer<typeof tenantSchema>;

// Invoice
export const invoiceSchema = z.object({
  id: z.string().optional().describe("a random UUIDv4"),
  leaseId: requiredString.min(1, "Please choose a lease"),
  period: requiredString.min(1, "A period is needed"),
  amount: z.number({ error: "Indicate the total amount" }),
  dueDate: z.date({ error: "Include invoice due date" }),
  status: z.enum(PaymentStatus, { error: "Select invoice payment status" }),
});
export type InvoiceSchema = z.infer<typeof invoiceSchema>;

// Payment
export const paymentSchema = z.object({
  id: z.string().optional().describe("a random UUIDv4"),
  invoiceId: requiredString.min(1, "Please choose a lease"),
  method: z.string().optional().nullable(),
  amount: z.number({ error: "Indicate amount being paid" }),
  paidOn: z.date().optional().nullable(),
  status: z.enum(PaymentStatus, { error: "Select invoice payment status" }),
});
export type PaymentSchema = z.infer<typeof paymentSchema>;

// Valuation
export const valuationSchema = z.object({
  id: z.string().optional().describe("a random UUIDv4"),
  assetId: requiredString.min(
    1,
    "Please make sure an asset is chosen before assigning an owner",
  ),
  value: z.number({ error: "Please include a value" }),
  valuedOn: z.date({ error: "Please provide a date of value addition" }),
});
export type ValuationSchema = z.infer<typeof valuationSchema>;

// Asset
export const assetSchema = z.object({
  id: z.string().optional().describe("a random UUIDv4"),
  name: requiredString.min(1, "Please provide an asset name"),
  location: requiredString.min(1, "Please provide an asset location"),
  type: z.enum(AssetType, { error: "Please choose an asset type" }),
  size: z
    .string({ error: "Please provide an asset size" })
    .optional()
    .nullable(),
  legalStatus: z.enum(AssetLegalStatus, {
    error: "Please choose a legal status",
  }),
  retiredAt: z
    .date({ error: "Please provide a date of retirement" })
    .optional()
    .nullable(),
  createdAt: z
    .date({ error: "Please provide a date of creation" })
    .optional()
    .nullable(),
});
export type AssetSchema = z.infer<typeof assetSchema>;

// miscellaneous
export const emailSchema = z.object({ email: z.string().trim().email() });
export type EmailSchema = z.infer<typeof emailSchema>;

export const singleContentSchema = z.object({ singleContent: requiredString });
export type SingleContentSchema = z.infer<typeof singleContentSchema>;
