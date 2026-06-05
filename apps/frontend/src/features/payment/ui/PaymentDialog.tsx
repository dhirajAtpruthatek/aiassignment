"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { workerPaymentApi } from "@/features/payment/payment.api";
import { Datepicker } from "@/components/ui/elements/Datepicker";
import { formatBusinessDate } from "@/utils/formatDate";

type Props = {
  type: "advance" | "salary" | "expense";
  workerId: string;
  label: string;
};

export default function PaymentDialog({ type, workerId, label }: Props) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setAmount("");
    setNote("");
    setDate(new Date());
  };

  const handleSubmit = async () => {
    try {
      if (!date) {
        toast.error("Date is required");
        return;
      }

      if (!amount) {
        toast.error("Amount is required");
        return;
      }

      setLoading(true);

      const payload = {
        workerId,
        amount: Number(amount),
        date: formatBusinessDate(date),
        note,
      };
  
      const res = await workerPaymentApi[type](payload);

      if (res.status) {
        toast.success(res.message);

        resetForm();     // ✅ clear
        setOpen(false);  // ✅ close
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !loading && setOpen(v)}>
      <DialogTrigger asChild>
        <Button>{label}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* ✅ Date */}
          <Datepicker value={date} onChange={setDate} />

          <Input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />

          <Input
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={loading}
          />
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}