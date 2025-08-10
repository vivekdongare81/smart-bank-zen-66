import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Car, 
  Utensils, 
  Home, 
  Gamepad2, 
  Plus,
  Settings,
  TrendingDown,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { expenseTransactions, budgetLimits as dummyBudgetLimits, expenseCategories } from "@/data/expenses";

const ExpenseTrackerPage = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [budgetLimits, setBudgetLimitsState] = useState<any[]>([]);

  useEffect(() => {
    // Use dummy data directly
    setTransactions(expenseTransactions);
    setBudgetLimitsState(dummyBudgetLimits);
  }, []);

  const [isSettingLimit, setIsSettingLimit] = useState(false);
  const [newLimit, setNewLimit] = useState({ category: "", limit: "" });

  const categories = expenseCategories;

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.icon : ShoppingCart;
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.color : "from-gray-400 to-gray-600";
  };

  const getSpentPercentage = (spent: number, limit: number) => {
    return Math.min((spent / limit) * 100, 100);
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return "text-destructive";
    if (percentage >= 70) return "text-warning";
    return "text-success";
  };

  const totalBudget = budgetLimits.reduce((sum, item) => sum + item.limit, 0);
  const totalSpent = budgetLimits.reduce((sum, item) => sum + item.spent, 0);
  const overallPercentage = (totalSpent / totalBudget) * 100;

  const handleSetLimit = () => {
    if (!newLimit.category || !newLimit.limit) {
      toast({
        title: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    const spent = transactions
      .filter(t => t.category === newLimit.category && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const existingIndex = budgetLimits.findIndex(item => item.category === newLimit.category);
    
    if (existingIndex >= 0) {
      const updated = [...budgetLimits];
      updated[existingIndex].limit = parseFloat(newLimit.limit);
      setBudgetLimitsState(updated);
    } else {
      setBudgetLimitsState([...budgetLimits, {
        category: newLimit.category,
        limit: parseFloat(newLimit.limit),
        spent: spent
      }]);
    }

    setNewLimit({ category: "", limit: "" });
    setIsSettingLimit(false);

    toast({
      title: "Budget Limit Updated",
      description: `Budget limit for ${newLimit.category} has been set.`
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Expense Tracker
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor your spending and stay within budget limits
          </p>
        </div>
        <Button onClick={() => setIsSettingLimit(true)}>
          <Settings className="h-4 w-4 mr-2" />
          Set Limits
        </Button>
      </div>

      {/* Budget Overview */}
      <Card className="bg-gradient-card border border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Monthly Budget Overview</span>
            <Badge variant={overallPercentage >= 90 ? "destructive" : overallPercentage >= 70 ? "secondary" : "default"}>
              {overallPercentage.toFixed(1)}% Used
            </Badge>
          </CardTitle>
          <CardDescription>
            ₹{totalSpent.toLocaleString()} of ₹{totalBudget.toLocaleString()} spent this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={overallPercentage} className="h-4" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>₹{(totalBudget - totalSpent).toLocaleString()} remaining</span>
            <span>{(100 - overallPercentage).toFixed(1)}% left</span>
          </div>
        </CardContent>
      </Card>

      {/* Category Budgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgetLimits.map((budget) => {
          const IconComponent = getCategoryIcon(budget.category);
          const percentage = getSpentPercentage(budget.spent, budget.limit);
          const remaining = budget.limit - budget.spent;
          
          return (
            <Card key={budget.category} className="bg-gradient-card border border-border/50 shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getCategoryColor(budget.category)} flex items-center justify-center`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{budget.category}</CardTitle>
                      <CardDescription>
                        ₹{budget.limit.toLocaleString()} limit
                      </CardDescription>
                    </div>
                  </div>
                  {percentage >= 90 && (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={percentage} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className={`font-semibold ${getStatusColor(percentage)}`}>
                      ₹{budget.spent.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ₹{remaining.toLocaleString()} remaining
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest spending activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.slice(0, 10).map((transaction) => {
              const IconComponent = getCategoryIcon(transaction.category);
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${transaction.type === 'credit' ? 'bg-success/10' : 'bg-muted/50'}`}>
                      {transaction.type === 'credit' ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <IconComponent className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-success' : 'text-foreground'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Set Budget Limit Modal */}
      {isSettingLimit && (
        <Card>
          <CardHeader>
            <CardTitle>Set Budget Limit</CardTitle>
            <CardDescription>Set or update spending limits for categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="limitCategory">Category</Label>
                <Select value={newLimit.category} onValueChange={(value) => setNewLimit({...newLimit, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="limitAmount">Monthly Limit (₹)</Label>
                <Input
                  id="limitAmount"
                  type="number"
                  placeholder="10000"
                  value={newLimit.limit}
                  onChange={(e) => setNewLimit({...newLimit, limit: e.target.value})}
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleSetLimit}>Set Limit</Button>
                <Button variant="outline" onClick={() => setIsSettingLimit(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExpenseTrackerPage;