import { Card } from "@/components/ui/card";
import { AccountCard } from "./AccountCard";
import { TransactionList } from "./TransactionList";
import { InvestmentOverview } from "./InvestmentOverview";
import { BudgetOverview } from "./BudgetOverview";
import { GoalProgress } from "./GoalProgress";
import { Wallet, TrendingUp, Target, PiggyBank } from "lucide-react";

const Dashboard = () => {
  // Simplified to show single account data
  const accountBalance = 2847650;
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card p-6 border border-border/50 shadow-card hover:shadow-elevated transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-success/10 rounded-full">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Investments</p>
              <p className="text-2xl font-bold">₹18,45,230</p>
              <p className="text-success text-sm">+12.4% this year</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card p-6 border border-border/50 shadow-card hover:shadow-elevated transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-info/10 rounded-full">
              <PiggyBank className="h-6 w-6 text-info" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Savings</p>
              <p className="text-2xl font-bold">₹6,75,420</p>
              <p className="text-info text-sm">3 active goals</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card p-6 border border-border/50 shadow-card hover:shadow-elevated transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-warning/10 rounded-full">
              <Target className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Monthly Budget</p>
              <p className="text-2xl font-bold">₹45,000</p>
              <p className="text-warning text-sm">68% used</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <AccountCard />
          <TransactionList />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <InvestmentOverview />
          <BudgetOverview />
          <GoalProgress />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;