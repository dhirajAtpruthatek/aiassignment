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

export default function PartyAdjustmentDialog({ partyId }: { partyId: string }) {
  const [open, setOpen] = useState(false);
  const [debit, setDebit] = useState("");
  const [credit, setCredit] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setDebit("");
    setCredit("");
    setNote("");
    setDate(new Date());
  };

  const handleSubmit = async () => {
    try {
      if (!date) return toast.error("Date required");
      if (!debit && !credit) return toast.error("Enter debit or credit");

      setLoading(true);
   
      const res = await partyPaymentApi.adjustment({
        partyId,
        debit: Number(debit || 0),
        credit: Number(credit || 0),
        date: formatBusinessDate(date),
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
        <Button variant="outline">Adjustment</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjustment Entry</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Datepicker value={date} onChange={setDate} />

          <Input
            placeholder="Debit"
            type="number"
            value={debit}
            onChange={(e) => setDebit(e.target.value)}
            disabled={loading}
          />

          <Input
            placeholder="Credit"
            type="number"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
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