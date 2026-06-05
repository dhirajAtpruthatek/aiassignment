import { httpClient } from "@/lib/http/client";
import { ApiResponse } from "@/utils/types/base.types";
import { WorkerPaymentBase, WorkerAdjustment } from "./payment.types";

export const workerPaymentApi = {
     advance: (data: WorkerPaymentBase) =>
          httpClient.post<ApiResponse<any>>(`/payment/worker/advance`, data),

     salary: (data: WorkerPaymentBase) =>
          httpClient.post<ApiResponse<any>>(`/payment/worker/salary`, data),

     expense: (data: WorkerPaymentBase) =>
          httpClient.post<ApiResponse<any>>(`/payment/worker/expense`, data),

     adjust: (data: WorkerAdjustment) =>
          httpClient.post<ApiResponse<any>>(`/payment/worker/adjust`, data),
};

export const partyPaymentApi = {
     payment: (data: {
          partyId: string;
          amount: number;
          paymentDate: string | Date;
          method?: string;
          note?: string;
     }) =>
          httpClient.post<ApiResponse<any>>(`/payment/party/payment`, data),

     adjustment: (data: {
          partyId: string;
          debit?: number;
          credit?: number;
          date: string | Date;
          note?: string;
     }) =>
          httpClient.post<ApiResponse<any>>(`/payment/party/adjustment`, data),
};