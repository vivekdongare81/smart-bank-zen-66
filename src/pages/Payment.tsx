import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { TransactionList } from "@/components/TransactionList";
import { paymentTransactions } from "@/data/payment";
function setSEO(title: string, description: string) {
  document.title = title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", description);
  else {
    const m = document.createElement("meta");
    m.setAttribute("name", "description");
    m.setAttribute("content", description);
    document.head.appendChild(m);
  }
  const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (link) link.href = window.location.href;
  else {
    const l = document.createElement("link");
    l.setAttribute("rel", "canonical");
    l.setAttribute("href", window.location.href);
    document.head.appendChild(l);
  }
}

export default function Payment() {
  const [amount, setAmount] = useState("");
  const [to, setTo] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    setSEO("Payment - SmartBank", "Make a secure payment with SmartBank.");
  }, []);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !to) {
      toast({ title: "Missing info", description: "Enter amount and recipient." });
      return;
    }
    toast({ title: "Payment initiated", description: `₹${amount} to ${to}` });
    setAmount("");
    setTo("");
    setNote("");
  };

  return (
    <section>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Payment</h1>
        <p className="text-muted-foreground">Send money quickly and securely</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Send Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePay} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input id="to" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Recipient name or account" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">Note (optional)</Label>
              <Input id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="What's this for?" />
            </div>
            <Button type="submit" className="w-full">Pay</Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-6">
        <TransactionList items={paymentTransactions} />
      </div>
    </section>
  );
}
