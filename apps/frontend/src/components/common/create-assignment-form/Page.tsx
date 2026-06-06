"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
 
import {
  invoiceSchema,
  InvoiceFormType,
} from "./invoice.schema";

import { Button } from "@/components/ui/button";
import { Field } from "./FormField";

export default function Page() {
  const [pageLoading, setPageLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,

    },
  } = useForm<InvoiceFormType>({
    resolver: zodResolver(invoiceSchema),

    defaultValues: {
      invoiceNumber: "",
      issueDate: "",
      partyId: "",
      status: "SENT",
      vechileNo: "",
      addionalNote: "",
      sgst: 9,
      cgst: 9,
      igst: 0,
    },
  });

  // Fetch initial values
  useEffect(() => {
    loadInvoice();
  }, []);

    
  /**
   * Function to load Inital Data and set to form's default values
   * @async
   */
  async function loadInvoice() {
    try {
      setPageLoading(true);

      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/invoice/default`
      );

      const res = await req.json();

      if (!res.status) {
        throw new Error(res.message);
      }

      reset({
        ...res.data,
      });
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to load invoice"
      );
    } finally {
      setPageLoading(false);
    }
  }

  
  /**
   * onSubmit Handler for final submission after form validation
   * - send data to backend here
   * @async
   * @param {InvoiceFormType} data 
   * @returns {*} 
   */
  async function onSubmit(data: InvoiceFormType) {
    try {

      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/invoice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const res = await req.json();
      if (!res.status) {
        throw new Error(res.message);
      }

      toast.success(res.message);

      reset();
    } catch (error: any) {
      toast.error(
        error?.message || "Something went wrong"
      );
    }
  }

  if (pageLoading) {
    return (
      <div className="p-4">
        Loading invoice...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4"
    >
      <Field.Input
        label="Invoice Number"
        error={errors.invoiceNumber}
        {...register("invoiceNumber")}
      />

      <Field.Input
        label="Issue Date"
        type="date"
        error={errors.issueDate}
        {...register("issueDate")}
      />

      <Field.Input
        label="Vehicle No"
        error={errors.vechileNo}
        {...register("vechileNo")}
      />

      <Field.Textarea
        label="Additional Note"
        error={errors.addionalNote}
        {...register("addionalNote")}
      />

      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : "Create Invoice"}
        </Button>


      </div>
    </form>
  );
}