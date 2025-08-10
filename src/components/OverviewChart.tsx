import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";
import { investments } from "@/data/investments";
import { goals } from "@/data/goals";
import { budgetLimits } from "@/data/expenses";

export const OverviewChart = () => {
  // Investment distribution data
  const investmentData = investments.map(inv => ({
    name: inv.name,
    value: inv.currentValue,
    type: inv.type
  }));

  // Goals progress data
  const goalsData = goals.map(goal => ({
    name: goal.name,
    target: goal.targetAmount,
    current: goal.currentAmount,
    progress: (goal.currentAmount / goal.targetAmount) * 100
  }));

  // Monthly budget vs spending
  const budgetData = budgetLimits.map(budget => ({
    category: budget.category,
    budget: budget.limit,
    spent: budget.spent,
    remaining: budget.limit - budget.spent
  }));

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--info))', 'hsl(var(--warning))', 'hsl(var(--accent))'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Investment Distribution */}
      <Card className="bg-gradient-card border border-border/50 shadow-card">
        <CardHeader>
          <CardTitle>Investment Portfolio</CardTitle>
          <CardDescription>Your investment distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={investmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {investmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Value']} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Goals Progress */}
      <Card className="bg-gradient-card border border-border/50 shadow-card">
        <CardHeader>
          <CardTitle>Goals Progress</CardTitle>
          <CardDescription>Track your financial goals</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={goalsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `₹${value.toLocaleString()}`, 
                  name === 'current' ? 'Current' : 'Target'
                ]}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="current" fill="hsl(var(--success))" />
              <Bar dataKey="target" fill="hsl(var(--muted))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Budget Overview */}
      <Card className="bg-gradient-card border border-border/50 shadow-card lg:col-span-2">
        <CardHeader>
          <CardTitle>Monthly Budget Analysis</CardTitle>
          <CardDescription>Budget vs actual spending across categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                formatter={(value: number, name: string) => [`₹${value.toLocaleString()}`, name]}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="budget" fill="hsl(var(--primary))" name="Budget" />
              <Bar dataKey="spent" fill="hsl(var(--warning))" name="Spent" />
              <Bar dataKey="remaining" fill="hsl(var(--success))" name="Remaining" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};