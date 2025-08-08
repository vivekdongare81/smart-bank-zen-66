import { useEffect } from "react";
import { TransactionList } from "@/components/TransactionList";
import { transactions as transactionsData } from "@/data/transactions";

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

export default function Transactions() {
  useEffect(() => {
    setSEO("Transactions - SmartBank", "View your latest SmartBank transactions.");
  }, []);

  return (
    <section>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">Review your recent account activity</p>
      </header>
      <TransactionList items={transactionsData} />
    </section>
  );
}
