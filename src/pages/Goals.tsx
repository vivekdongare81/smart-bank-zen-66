import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Car, 
  Home, 
  GraduationCap, 
  Plane, 
  Plus,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { goals as dummyGoals, goalIcons } from "@/data/goals";
import { investments as investmentData } from "@/data/investments";

const GoalsPage = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [userInvestments, setUserInvestments] = useState<any[]>([]);

  useEffect(() => {
    // Use dummy data directly
    const goalsWithIcons = dummyGoals.map(goal => ({
      ...goal,
      icon: goalIcons.find(g => g.label.toLowerCase() === goal.category?.toLowerCase())?.icon || Target,
      timeFrame: Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30))
    }));
    setGoals(goalsWithIcons);

    // Use dummy investment data
    setUserInvestments(investmentData);
  }, []);

  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    timeFrame: "",
    icon: Target
  });

  // Goal icons are now imported from data file

  // Calculate total current investment value and weighted average return
  const totalCurrentInvestmentValue = userInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const weightedAvgReturn = userInvestments.length > 0 
    ? userInvestments.reduce((sum, inv) => sum + (inv.expectedReturn * inv.currentValue), 0) / totalCurrentInvestmentValue
    : 8; // Default 8% if no investments

  const calculateAdvancedGoalFeasibility = (targetAmount: number, currentGoalAmount: number, timeFrameMonths: number) => {
    const monthsRemaining = timeFrameMonths;
    
    // If no timeframe or past deadline, mark as challenging
    if (monthsRemaining <= 0) {
      return {
        isAchievable: false,
        monthlyRequired: 0,
        projectedAmount: currentGoalAmount,
        shortfall: targetAmount - currentGoalAmount,
        message: "Goal deadline has passed or is too close",
        investmentGrowth: 0,
        totalAvailable: currentGoalAmount,
        confidence: "Low"
      };
    }

    // Calculate projected growth of existing investments
    const monthlyReturn = weightedAvgReturn / 12 / 100;
    const projectedInvestmentValue = totalCurrentInvestmentValue * Math.pow(1 + monthlyReturn, monthsRemaining);
    
    // Add step-up contributions from existing investments
    let stepUpContributions = 0;
    userInvestments.forEach(inv => {
      if (inv.stepUp && inv.stepUpAmount) {
        // Future value of monthly step-up contributions
        const monthlyStepUp = inv.stepUpAmount;
        stepUpContributions += monthlyStepUp * (((Math.pow(1 + monthlyReturn, monthsRemaining) - 1) / monthlyReturn) || monthsRemaining);
      }
    });

    // Total available from current goal savings + investment growth + step-ups
    const futureValueCurrentGoal = currentGoalAmount * Math.pow(1 + monthlyReturn, monthsRemaining);
    const totalProjectedAmount = projectedInvestmentValue + stepUpContributions + futureValueCurrentGoal;
    
    const shortfall = targetAmount - totalProjectedAmount;
    
    if (shortfall <= 0) {
      return {
        isAchievable: true,
        monthlyRequired: 0,
        projectedAmount: totalProjectedAmount,
        shortfall: 0,
        message: "Goal achievable with current investments and savings!",
        investmentGrowth: projectedInvestmentValue - totalCurrentInvestmentValue,
        totalAvailable: totalProjectedAmount,
        confidence: "High"
      };
    }
    
    // Calculate additional monthly investment required
    const monthlyRequired = shortfall / (((Math.pow(1 + monthlyReturn, monthsRemaining) - 1) / monthlyReturn) || monthsRemaining);
    
    // Determine feasibility based on monthly capacity (assume max 30% of typical income)
    const maxMonthlyCapacity = 25000; // Reasonable monthly investment capacity
    const isAchievable = monthlyRequired <= maxMonthlyCapacity;
    
    let confidence = "Medium";
    if (monthlyRequired <= 10000) confidence = "High";
    else if (monthlyRequired > 20000) confidence = "Low";
    
    return {
      isAchievable,
      monthlyRequired: Math.round(monthlyRequired),
      projectedAmount: totalProjectedAmount,
      shortfall: Math.round(shortfall),
      message: isAchievable 
        ? `Invest ₹${Math.round(monthlyRequired).toLocaleString()} monthly to achieve this goal`
        : `Goal requires ₹${Math.round(monthlyRequired).toLocaleString()}/month - consider extending timeline`,
      investmentGrowth: projectedInvestmentValue - totalCurrentInvestmentValue,
      totalAvailable: totalProjectedAmount,
      confidence
    };
  };

  const getGoalProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.timeFrame) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const deadline = new Date();
    deadline.setMonth(deadline.getMonth() + parseInt(newGoal.timeFrame));

    const displayGoal = {
      id: Date.now().toString(),
      userId: "1",
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      deadline: deadline.toISOString(),
      category: goalIcons.find(g => g.icon === newGoal.icon)?.label || 'General',
      priority: 'medium' as const,
      timeFrame: parseInt(newGoal.timeFrame),
      icon: newGoal.icon,
    };

    setGoals([...goals, displayGoal]);
    setNewGoal({
      name: "",
      targetAmount: "",
      timeFrame: "",
      icon: Target
    });
    setIsAddingGoal(false);

    toast({
      title: "Goal Added",
      description: "Your new financial goal has been created successfully."
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Financial Goals
          </h1>
          <p className="text-muted-foreground mt-2">
            Set and track your financial objectives with smart planning
          </p>
        </div>
        <Button onClick={() => setIsAddingGoal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Investment Integration Summary */}
      <Card className="bg-gradient-card border border-border/50 shadow-card">
        <CardHeader>
          <CardTitle>Investment Analysis</CardTitle>
          <CardDescription>How your current investments support your goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">₹{totalCurrentInvestmentValue.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Current Investment Value</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{weightedAvgReturn.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">Weighted Avg Return</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info">{userInvestments.length}</div>
              <p className="text-sm text-muted-foreground">Active Investments</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border border-border/50 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border border-border/50 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Target Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{goals.reduce((sum, goal) => sum + goal.targetAmount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border border-border/50 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Saved So Far</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              ₹{goals.reduce((sum, goal) => sum + goal.currentAmount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <div className="space-y-6">
        {goals.map((goal) => {
          const IconComponent = goal.icon;
          const progress = getGoalProgress(goal.currentAmount, goal.targetAmount);
          const feasibility = calculateAdvancedGoalFeasibility(goal.targetAmount, goal.currentAmount, goal.timeFrame);
          const remainingAmount = goal.targetAmount - goal.currentAmount;

          return (
            <Card key={goal.id} className="bg-gradient-card border border-border/50 shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{goal.name}</CardTitle>
                      <CardDescription>
                        Target: ₹{goal.targetAmount.toLocaleString()} in {goal.timeFrame} months
                      </CardDescription>
                    </div>
                  </div>
                  
                  {/* Investment-Based Goal Status */}
                  <div className="text-right">
                    <Badge 
                      variant={feasibility.isAchievable ? "default" : "destructive"}
                      className="flex items-center space-x-1 mb-2"
                    >
                      {feasibility.isAchievable ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <AlertTriangle className="h-3 w-3" />
                      )}
                      <span>{feasibility.isAchievable ? "Achievable" : "Challenging"}</span>
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {feasibility.confidence} Confidence
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Investment-Based Feasibility Review */}
                <div className={`p-4 rounded-lg border ${
                  feasibility.isAchievable 
                    ? "bg-success/5 border-success/20" 
                    : "bg-destructive/5 border-destructive/20"
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      feasibility.isAchievable ? "bg-success/10" : "bg-destructive/10"
                    }`}>
                      <TrendingUp className={`h-4 w-4 ${
                        feasibility.isAchievable ? "text-success" : "text-destructive"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-2">Investment-Based Analysis</h4>
                      <p className="text-sm mb-3">{feasibility.message}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Projected from Investments</p>
                          <p className="text-sm font-semibold text-success">
                            ₹{feasibility.investmentGrowth.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Total Available by Deadline</p>
                          <p className="text-sm font-semibold text-primary">
                            ₹{feasibility.totalAvailable.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {feasibility.monthlyRequired > 0 && (
                        <div className="mt-3 p-2 bg-primary/5 rounded border border-primary/20">
                          <p className="text-xs text-muted-foreground">Additional Monthly Investment Needed</p>
                          <p className="text-sm font-semibold text-primary">
                            ₹{feasibility.monthlyRequired.toLocaleString()}/month
                          </p>
                        </div>
                      )}

                      {feasibility.isAchievable && feasibility.monthlyRequired === 0 && (
                        <div className="mt-3 p-2 bg-success/5 rounded border border-success/20">
                          <p className="text-sm text-success font-medium">
                            🎉 Goal achievable with current investment growth!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Current Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">Current Savings Progress</h4>
                    <span className="text-sm font-medium">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-success">₹{goal.currentAmount.toLocaleString()} saved</span>
                    <span className="text-muted-foreground">₹{remainingAmount.toLocaleString()} remaining</span>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/20">
                  <div className="text-center">
                    <Calendar className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Timeline</p>
                    <p className="text-sm font-medium">{goal.timeFrame}m</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Avg Return</p>
                    <p className="text-sm font-medium">{weightedAvgReturn.toFixed(1)}%</p>
                  </div>
                  <div className="text-center">
                    <Target className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Target</p>
                    <p className="text-sm font-medium">₹{(goal.targetAmount / 100000).toFixed(1)}L</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className={`text-sm font-medium ${
                      feasibility.isAchievable ? "text-success" : "text-destructive"
                    }`}>
                      {feasibility.isAchievable ? "On Track" : "At Risk"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Goal Form */}
      {isAddingGoal && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Goal</CardTitle>
            <CardDescription>Create a new financial goal to track your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goalName">Goal Name</Label>
                <Input
                  id="goalName"
                  placeholder="e.g., Buy a Car, Emergency Fund"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Target Amount (₹)</Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    placeholder="500000"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeFrame">Time Frame (Months)</Label>
                  <Input
                    id="timeFrame"
                    type="number"
                    placeholder="24"
                    value={newGoal.timeFrame}
                    onChange={(e) => setNewGoal({...newGoal, timeFrame: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Choose Icon</Label>
                <div className="flex space-x-2">
                  {goalIcons.map((iconOption) => {
                    const IconComponent = iconOption.icon;
                    return (
                      <Button
                        key={iconOption.label}
                        variant={newGoal.icon === iconOption.icon ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewGoal({...newGoal, icon: iconOption.icon})}
                      >
                        <IconComponent className="h-4 w-4 mr-1" />
                        {iconOption.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleAddGoal}>Add Goal</Button>
                <Button variant="outline" onClick={() => setIsAddingGoal(false)}>
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

export default GoalsPage;