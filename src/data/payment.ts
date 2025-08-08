import { ArrowUpRight, Banknote, Building2 } from "lucide-react";
import type { TransactionItem } from "@/components/TransactionList";

export const paymentTransactions: TransactionItem[] = [
  {
    id: 101,
    type: "expense",
    description: "UPI Transfer to Rahul",
    category: "Peer Transfer",
    amount: 1200,
    date: "Today, 4:10 PM",
    icon: ArrowUpRight,
    merchant: "UPI • rahul@upi",
  },
  {
    id: 102,
    type: "expense",
    description: "House Rent",
    category: "Housing",
    amount: 18000,
    date: "1st of the month",
    icon: Building2,
    merchant: "Mr. Sharma",
  },
  {
    id: 103,
    type: "expense",
    description: "Electricity Bill",
    category: "Bills & Utilities",
    amount: 2450,
    date: "Yesterday, 8:00 PM",
    icon: Banknote,
    merchant: "BESCOM",
  },
];
