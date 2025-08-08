import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle } from "lucide-react";

export const BudgetOverview = () => {
  const budgetCategories = [
    {
      id: 1,
      name: "Food & Dining",
      spent: 8500,
      budget: 12000,
      color: "bg-primary"
    },
    {
      id: 2,
      name: "Transportation",
      spent: 4200,
      budget: 5000,
      color: "bg-info"
    },
    {
      id: 3,
      name: "Shopping",
      spent: 9800,
      budget: 8000,
      color: "bg-warning"
    },
    {
      id: 4,
      name: "Bills & Utilities",
      spent: 6500,
      budget: 7000,
      color: "bg-success"
    }
  ];

  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const budgetUsed = (totalSpent / totalBudget) * 100;

  return (
    <Card className="bg-gradient-card p-6 border border-border/50 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Monthly Budget</h3>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          Edit
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Budget Usage</p>
          <p className="text-sm font-medium">{budgetUsed.toFixed(1)}%</p>
        </div>
        <div className="w-full bg-muted/30 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              budgetUsed > 90 ? 'bg-destructive' : 
              budgetUsed > 75 ? 'bg-warning' : 'bg-gradient-primary'
            }`}
            style={{ width: `${Math.min(budgetUsed, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-sm text-muted-foreground">
            ₹{totalSpent.toLocaleString()} spent
          </p>
          <p className="text-sm text-muted-foreground">
            ₹{totalBudget.toLocaleString()} budget
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {budgetCategories.map((category) => {
          const percentage = (category.spent / category.budget) * 100;
          const isOverBudget = percentage > 100;
          
          return (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                  <p className="font-medium text-sm">{category.name}</p>
                  {isOverBudget ? (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  ) : percentage > 80 ? (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-success" />
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">
                    ₹{category.spent.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    of ₹{category.budget.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isOverBudget ? 'bg-destructive' : 
                    percentage > 80 ? 'bg-warning' : category.color
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};