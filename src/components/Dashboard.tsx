import { Card } from "@/components/ui/card";
import { AccountCard } from "./AccountCard";
import { TransactionList } from "./TransactionList";
import { OverviewChart } from "./OverviewChart";
import { QuickActions } from "./QuickActions";
import { FinancialSummary } from "./FinancialSummary";
import { Wallet, TrendingUp } from "lucide-react";
import { investments } from "@/data/investments";
import { goals } from "@/data/goals";
import { budgetLimits } from "@/data/expenses";

const Dashboard = () => {
  // Calculate real data from all sources
  const totalInvestments = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalGoalsSavings = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const accountBalance = totalInvestments + totalGoalsSavings + 500000; // Adding some liquid cash
  const monthlyChange = 18750;
  const changePercent = 2.4;

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            SmartBank
          </h1>
          <p className="text-muted-foreground">Good morning! Here's your financial overview</p>
        </div>
      </div>

      {/* Total Balance Card */}
      <Card className="bg-gradient-primary p-6 border-0 shadow-glow">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-primary-foreground/80 text-sm font-medium">Account Balance</p>
            <p className="text-4xl font-bold text-primary-foreground">
              ₹{accountBalance.toLocaleString()}
            </p>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary-foreground" />
              <span className="text-primary-foreground/90 text-sm">
                +₹{monthlyChange.toLocaleString()} ({changePercent}%) this month
              </span>
            </div>
          </div>
          <div className="p-3 bg-primary-foreground/10 rounded-full">
            <Wallet className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
      </Card>

      {/* Financial Summary */}
      <FinancialSummary />

      {/* Charts and Analytics */}
      <OverviewChart />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <AccountCard />
          <TransactionList />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;