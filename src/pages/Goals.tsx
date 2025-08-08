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
import { getCurrentUser, getGoals, addGoal } from "@/lib/storage";

const GoalsPage = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      const userGoals = getGoals().filter(goal => goal.userId === currentUser.id);
      const goalsWithIcons = userGoals.map(goal => ({
        ...goal,
        icon: goalIcons.find(g => g.label.toLowerCase() === goal.category?.toLowerCase())?.icon || Target,
        timeFrame: Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30))
      }));
      setGoals(goalsWithIcons);
    }
  }, [currentUser]);

  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    timeFrame: "",
    icon: Target
  });

  const goalIcons = [
    { icon: Car, label: "Car" },
    { icon: Home, label: "Home" },
    { icon: GraduationCap, label: "Education" },
    { icon: Plane, label: "Travel" },
    { icon: Target, label: "General" }
  ];

  // Simulated investment data
  const totalInvestments = 1200000;
  const avgReturnRate = 12; // 12% annual return

  const calculateGoalFeasibility = (targetAmount: number, currentAmount: number, timeFrameMonths: number) => {
    const monthsRemaining = timeFrameMonths;
    const monthlyReturn = avgReturnRate / 12 / 100;
    
    // Future value of current amount
    const futureValueCurrent = currentAmount * Math.pow(1 + monthlyReturn, monthsRemaining);
    
    // Required additional amount
    const requiredAmount = targetAmount - futureValueCurrent;
    
    if (requiredAmount <= 0) {
      return {
        isAchievable: true,
        monthlyRequired: 0,
        message: "Goal achievable with current savings!"
      };
    }
    
    // Required monthly investment
    const monthlyRequired = requiredAmount / (((Math.pow(1 + monthlyReturn, monthsRemaining) - 1) / monthlyReturn) || monthsRemaining);
    
    return {
      isAchievable: monthlyRequired <= 50000, // Assuming max monthly capacity
      monthlyRequired: Math.round(monthlyRequired),
      message: monthlyRequired <= 50000 
        ? `Invest ₹${Math.round(monthlyRequired).toLocaleString()} monthly to achieve this goal`
        : "Goal might be challenging with current timeline"
    };
  };

  const getGoalProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const handleAddGoal = () => {
    if (!currentUser) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add goals.",
        variant: "destructive"
      });
      return;
    }

    if (!newGoal.name || !newGoal.targetAmount || !newGoal.timeFrame) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const deadline = new Date();
    deadline.setMonth(deadline.getMonth() + parseInt(newGoal.timeFrame));

    const goalData = {
      userId: currentUser.id,
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      deadline: deadline.toISOString(),
      category: goalIcons.find(g => g.icon === newGoal.icon)?.label || 'General',
      priority: 'medium' as const,
    };

    addGoal(goalData);

    const displayGoal = {
      ...goalData,
      id: Date.now(),
      timeFrame: parseInt(newGoal.timeFrame),
      icon: newGoal.icon,
      createdDate: new Date().toISOString().split('T')[0]
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
          const feasibility = calculateGoalFeasibility(goal.targetAmount, goal.currentAmount, goal.timeFrame);
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
                  <Badge 
                    variant={feasibility.isAchievable ? "default" : "destructive"}
                    className="flex items-center space-x-1"
                  >
                    {feasibility.isAchievable ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <AlertTriangle className="h-3 w-3" />
                    )}
                    <span>{feasibility.isAchievable ? "Achievable" : "Challenging"}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-success">₹{goal.currentAmount.toLocaleString()}</span>
                    <span className="text-muted-foreground">₹{remainingAmount.toLocaleString()} remaining</span>
                  </div>
                </div>

                {/* Goal Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/50">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Time Frame</p>
                      <p className="text-sm font-medium">{goal.timeFrame} months</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Monthly Required</p>
                      <p className="text-sm font-medium text-primary">
                        ₹{feasibility.monthlyRequired.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className={`text-sm font-medium ${feasibility.isAchievable ? 'text-success' : 'text-destructive'}`}>
                        {feasibility.isAchievable ? 'On Track' : 'Needs Adjustment'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">{feasibility.message}</p>
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