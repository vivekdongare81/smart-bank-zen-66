import { Card } from "@/components/ui/card";
import { CreditCard, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const AccountCard = () => {
  const [showBalance, setShowBalance] = useState(true);

  const accounts = [
    {
      id: 1,
      name: "Primary Savings",
      type: "Savings Account",
      balance: 125430,
      accountNumber: "••••5678",
      bank: "HDFC Bank"
    },
    {
      id: 2,
      name: "Salary Account",
      type: "Current Account", 
      balance: 87650,
      accountNumber: "••••9012",
      bank: "ICICI Bank"
    },
    {
      id: 3,
      name: "Premium Credit Card",
      type: "Credit Card",
      balance: -15750,
      limit: 200000,
      accountNumber: "••••3456",
      bank: "SBI Cards"
    }
  ];

  return (
    <Card className="bg-gradient-card p-6 border border-border/50 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Your Accounts</h3>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
        >
          {showBalance ? (
            <Eye className="h-4 w-4 text-muted-foreground" />
          ) : (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>

      <div className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{account.name}</p>
                <p className="text-sm text-muted-foreground">
                  {account.bank} • {account.accountNumber}
                </p>
                <p className="text-xs text-muted-foreground">{account.type}</p>
              </div>
            </div>
            <div className="text-right">
              {showBalance ? (
                <>
                  <p className={`font-semibold ${
                    account.balance >= 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    ₹{Math.abs(account.balance).toLocaleString()}
                  </p>
                  {account.limit && (
                    <p className="text-xs text-muted-foreground">
                      Limit: ₹{account.limit.toLocaleString()}
                    </p>
                  )}
                </>
              ) : (
                <p className="font-semibold text-muted-foreground">••••••</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};