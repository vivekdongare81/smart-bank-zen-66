import { Card } from "@/components/ui/card";
import { Target, Calendar, Car, Home, Plane } from "lucide-react";

export const GoalProgress = () => {
  const goals = [
    {
      id: 1,
      name: "New Car",
      target: 800000,
      current: 450000,
      deadline: "Dec 2024",
      icon: Car,
      color: "bg-primary"
    },
    {
      id: 2,
      name: "House Down Payment",
      target: 2500000,
      current: 1200000,
      deadline: "Jun 2025",
      icon: Home,
      color: "bg-success"
    },
    {
      id: 3,
      name: "Europe Trip",
      target: 250000,
      current: 180000,
      deadline: "Mar 2024",
      icon: Plane,
      color: "bg-info"
    }
  ];

  return (
    <Card className="bg-gradient-card p-6 border border-border/50 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Financial Goals</h3>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          Add Goal
        </button>
      </div>

      <div className="space-y-6">
        {goals.map((goal) => {
          const percentage = (goal.current / goal.target) * 100;
          const remaining = goal.target - goal.current;
          const IconComponent = goal.icon;

          return (
            <div key={goal.id} className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${goal.color}/10`}>
                  <IconComponent className={`h-5 w-5 ${goal.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{goal.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {goal.deadline}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ₹{goal.current.toLocaleString()} of ₹{goal.target.toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{percentage.toFixed(1)}% Complete</span>
                  <span className="text-sm text-muted-foreground">
                    ₹{remaining.toLocaleString()} remaining
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${goal.color}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>

              {percentage >= 100 ? (
                <div className="flex items-center text-success text-sm">
                  <Target className="h-4 w-4 mr-1" />
                  Goal achieved! 🎉
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {percentage >= 80 
                    ? "Almost there! You're doing great." 
                    : "Keep saving to reach your goal faster."}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};