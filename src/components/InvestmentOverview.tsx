import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export const InvestmentOverview = () => {
  const investments = [
    {
      id: 1,
      name: "Mutual Funds",
      value: 850000,
      change: 12.4,
      allocation: 46
    },
    {
      id: 2,
      name: "Stocks",
      value: 450000,
      change: -2.1,
      allocation: 24
    },
    {
      id: 3,
      name: "Fixed Deposits",
      value: 300000,
      change: 6.8,
      allocation: 16
    },
    {
      id: 4,
      name: "Gold",
      value: 245230,
      change: 8.2,
      allocation: 14
    }
  ];

  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0);

  return (
    <Card className="bg-gradient-card p-6 border border-border/50 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Investment Portfolio</h3>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          Manage
        </button>
      </div>

      <div className="mb-6">
        <p className="text-2xl font-bold">₹{totalValue.toLocaleString()}</p>
        <p className="text-success text-sm flex items-center">
          <TrendingUp className="h-4 w-4 mr-1" />
          +8.7% overall return
        </p>
      </div>

      <div className="space-y-4">
        {investments.map((investment) => (
          <div key={investment.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{investment.name}</p>
                <p className="text-xs text-muted-foreground">
                  {investment.allocation}% allocation
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">
                  ₹{investment.value.toLocaleString()}
                </p>
                <div className={`flex items-center text-xs ${
                  investment.change >= 0 ? 'text-success' : 'text-destructive'
                }`}>
                  {investment.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {investment.change >= 0 ? '+' : ''}{investment.change}%
                </div>
              </div>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2">
              <div
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${investment.allocation * 2}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};