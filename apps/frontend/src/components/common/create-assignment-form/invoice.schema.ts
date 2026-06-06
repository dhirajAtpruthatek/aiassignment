import { z } from "zod"

export const invoiceSchema = z.object({
  invoiceNumber: z
    .string()
    .min(1, "Invoice number is required"),

  issueDate: z
    .string()
    .min(1, "Issue date is required"),

  partyId: z
    .string()
    .uuid("Select a valid party"),

  shipToId: z
    .string()
    .optional(),

  stateCode: z
    .string()
    .optional(),

  status: z.enum([
    "DRAFT",
    "SENT",
    "CANCELLED",
  ]),

  vechileNo: z.string().optional(),

  addionalNote: z.string().optional(),

  chNo: z.string().optional(),

  poNo: z.string().optional(),

  sgst: z.number().min(0).max(100),

  cgst: z.number().min(0).max(100),

  igst: z.number().min(0).max(100),
})

export type InvoiceFormType =
  z.infer<typeof invoiceSchema>