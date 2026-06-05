"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Datepicker } from "@/components/ui/elements/Datepicker";
import { partyPaymentApi } from "@/features/payment/payment.api";
import { formatBusinessDate } from "@/utils/formatDate";

export default function PartyPaymentDialog({ partyId }: { partyId: string }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setAmount("");
    setNote("");
    setDate(new Date());
  };

  const handleSubmit = async () => {
    try {
      if (!amount) return toast.error("Amount required");
      if (!date) return toast.error("Date required");

      setLoading(true);

   
      const res = await partyPaymentApi.payment({
        partyId,
        amount: Number(amount),
        paymentDate: formatBusinessDate(date),
        method: "CASH",
        note,
      });

      if (res.status) {
        toast.success(res.message);
        reset();
        setOpen(false);
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
        <Button>Record Payment</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
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

        <Button onClick={handleSubmit} disabled={loading} className="mt-2">
          {loading ? "Saving..." : "Submit"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}