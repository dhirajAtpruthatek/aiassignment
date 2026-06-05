import { LedgerReferenceType, PartyType } from "@/utils/types/enum.types"

export type LedgerEntryModel = {
  id: string
  partyId: string
  year: number
  month: number
  referenceType: LedgerReferenceType
  referenceId?: string | null
  description?: string | null
  debit: number
  credit: number
  date: string
  paymentId?: string | null
  createdAt: string
}

export type Payment = {
  id: string
  partyId: string
  partyType: PartyType
  amount: number
  method?: string | null
  note?: string | null
  paymentDate: string
  createdAt: string
}
export type WorkerPaymentBase = {
  workerId: string;
  amount: number;
  date: string | Date;
  note?: string;
};

export type WorkerAdjustment = {
  workerId: string;
  debit: number;
  credit: number;
  date: string | Date;
  note?: string;
};