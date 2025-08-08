import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownLeft, Coffee, Car, ShoppingBag, Smartphone } from "lucide-react";

export type TransactionItem = {
  id: number;
  type: "income" | "expense";
  description: string;
  category: string;
  amount: number;
  date: string;
  icon: LucideIcon;
  merchant: string;
};

export const TransactionList = ({ items }: { items?: TransactionItem[] }) => {
  const transactions: TransactionItem[] = items ?? [
    {
      id: 1,
      type: "expense",
      description: "Starbucks Coffee",
      category: "Food & Dining",
      amount: 450,
      date: "Today, 2:30 PM",
      icon: Coffee,
      merchant: "Starbucks India"
    },
    {
      id: 2,
      type: "income",
      description: "Salary Credit",
      category: "Income",
      amount: 85000,
      date: "Yesterday, 9:00 AM",
      icon: ArrowDownLeft,
      merchant: "Tech Corp Ltd."
    },
    {
      id: 3,
      type: "expense",
      description: "Uber Ride",
      category: "Transportation",
      amount: 280,
      date: "Yesterday, 6:45 PM",
      icon: Car,
      merchant: "Uber India"
    },
    {
      id: 4,
      type: "expense",
      description: "Amazon Purchase",
      category: "Shopping",
      amount: 1299,
      date: "2 days ago",
      icon: ShoppingBag,
      merchant: "Amazon.in"
    },
    {
      id: 5,
      type: "expense",
      description: "Mobile Recharge",
      category: "Bills & Utilities",
      amount: 599,
      date: "3 days ago",
      icon: Smartphone,
      merchant: "Jio Prepaid"
    }
  ];

  return (
    <Card className="bg-gradient-card p-6 border border-border/50 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Recent Transactions</h3>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => {
          const IconComponent = transaction.icon;
          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'income' 
                    ? 'bg-success/10' 
                    : 'bg-muted/30'
                }`}>
                  <IconComponent className={`h-5 w-5 ${
                    transaction.type === 'income' 
                      ? 'text-success' 
                      : 'text-muted-foreground'
                  }`} />
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.merchant}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'income' 
                    ? 'text-success' 
                    : 'text-foreground'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};