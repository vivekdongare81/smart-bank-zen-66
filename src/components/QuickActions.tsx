import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Target, 
  CreditCard, 
  Receipt, 
  PiggyBank, 
  Calculator,
  ArrowRight
} from "lucide-react";

export const QuickActions = () => {
  const actions = [
    {
      title: "Add Investment",
      description: "Start a new investment",
      icon: TrendingUp,
      link: "/investments",
      color: "success"
    },
    {
      title: "Set Goal",
      description: "Create financial goal",
      icon: Target,
      link: "/goals",
      color: "primary"
    },
    {
      title: "Apply Card",
      description: "Get a credit card",
      icon: CreditCard,
      link: "/credit-card",
      color: "info"
    },
    {
      title: "Track Expense",
      description: "Log your spending",
      icon: Receipt,
      link: "/expense-tracker",
      color: "warning"
    },
    {
      title: "Get Loan",
      description: "Apply for a loan",
      icon: PiggyBank,
      link: "/loans",
      color: "accent"
    },
    {
      title: "Make Payment",
      description: "Pay bills & transfer",
      icon: Calculator,
      link: "/payment",
      color: "secondary"
    }
  ];

  return (
    <Card className="bg-gradient-card border border-border/50 shadow-card">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Access all your financial tools</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Link key={action.title} to={action.link}>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-elevated transition-all duration-300 group"
                >
                  <div className={`p-2 rounded-lg bg-${action.color}/10 group-hover:bg-${action.color}/20 transition-colors`}>
                    <IconComponent className={`h-5 w-5 text-${action.color}`} />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};