import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  AlertCircle, 
  CheckCircle,
  DollarSign,
  PieChart
} from "lucide-react";
import { investments } from "@/data/investments";
import { goals } from "@/data/goals";
import { budgetLimits } from "@/data/expenses";

export const FinancialSummary = () => {
  // Calculate totals
  const totalInvestments = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalGoalsTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalGoalsCurrent = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalBudget = budgetLimits.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = budgetLimits.reduce((sum, budget) => sum + budget.spent, 0);
  
  const goalsProgress = (totalGoalsCurrent / totalGoalsTarget) * 100;
  const budgetUsage = (totalSpent / totalBudget) * 100;
  
  // Calculate investment growth
  const totalInvestedAmount = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const investmentGrowth = ((totalInvestments - totalInvestedAmount) / totalInvestedAmount) * 100;

  const summaryCards = [
    {
      title: "Net Worth",
      value: `₹${(totalInvestments + totalGoalsCurrent).toLocaleString()}`,
      change: investmentGrowth,
      icon: DollarSign,
      description: "Total assets value"
    },
    {
      title: "Investment Growth",
      value: `₹${(totalInvestments - totalInvestedAmount).toLocaleString()}`,
      change: investmentGrowth,
      icon: investmentGrowth >= 0 ? TrendingUp : TrendingDown,
      description: "Portfolio performance"
    },
    {
      title: "Goals Progress",
      value: `${goalsProgress.toFixed(1)}%`,
      change: goalsProgress,
      icon: Target,
      description: "Financial goals completion"
    },
    {
      title: "Budget Health",
      value: `${(100 - budgetUsage).toFixed(1)}%`,
      change: 100 - budgetUsage,
      icon: budgetUsage > 80 ? AlertCircle : CheckCircle,
      description: "Monthly budget remaining"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Financial Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const IconComponent = card.icon;
          const isPositive = card.change >= 0;
          
          return (
            <Card key={card.title} className="bg-gradient-card border border-border/50 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                  <IconComponent className={`h-4 w-4 ${
                    card.title === "Investment Growth" ? (isPositive ? 'text-success' : 'text-destructive') :
                    card.title === "Budget Health" ? (card.change > 50 ? 'text-success' : card.change > 20 ? 'text-warning' : 'text-destructive') :
                    'text-primary'
                  }`} />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.description}</p>
                  {card.title === "Investment Growth" && (
                    <Badge variant={isPositive ? "default" : "destructive"} className="text-xs">
                      {isPositive ? '+' : ''}{card.change.toFixed(1)}%
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border border-border/50 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Goals Achievement</span>
            </CardTitle>
            <CardDescription>Overall progress towards your financial goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>₹{totalGoalsCurrent.toLocaleString()}</span>
                <span>₹{totalGoalsTarget.toLocaleString()}</span>
              </div>
              <Progress value={goalsProgress} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {goalsProgress.toFixed(1)}% of total goals achieved
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border border-border/50 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-warning" />
              <span>Budget Utilization</span>
            </CardTitle>
            <CardDescription>How much of your monthly budget you've used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>₹{totalSpent.toLocaleString()}</span>
                <span>₹{totalBudget.toLocaleString()}</span>
              </div>
              <Progress 
                value={budgetUsage} 
                className="h-3"
                style={{
                  backgroundColor: budgetUsage > 80 ? 'hsl(var(--destructive))' : 
                                   budgetUsage > 60 ? 'hsl(var(--warning))' : 
                                   'hsl(var(--success))'
                }}
              />
              <p className="text-sm text-muted-foreground">
                {budgetUsage.toFixed(1)}% of monthly budget used
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};