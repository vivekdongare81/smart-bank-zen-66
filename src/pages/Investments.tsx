import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Coins, 
  Shield, 
  PiggyBank, 
  Building2, 
  Plus,
  Edit2,
  Trash2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { investments as dummyInvestments, investmentTypes } from "@/data/investments";

const InvestmentsPage = () => {
  const [investments, setInvestments] = useState<any[]>([]);

  useEffect(() => {
    // Use dummy data directly
    const investmentsWithIcons = dummyInvestments.map(inv => ({
      ...inv,
      icon: investmentTypes.find(t => t.value === inv.type)?.icon || TrendingUp
    }));
    setInvestments(investmentsWithIcons);
  }, []);

  const [isAddingInvestment, setIsAddingInvestment] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    type: "",
    name: "",
    amount: "",
    expectedReturn: "",
    stepUp: false,
    stepUpAmount: ""
  });

  // Investment types are now imported from data file

  const calculateAnnualIncome = (amount: number, returnRate: number) => {
    return Math.round((amount * returnRate) / 100);
  };

  const handleAddInvestment = () => {
    if (!newInvestment.type || !newInvestment.name || !newInvestment.amount || !newInvestment.expectedReturn) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedInvestment = {
      id: Date.now().toString(),
      userId: "1",
      type: newInvestment.type as 'mutual-funds' | 'gold' | 'bonds' | 'eps' | 'nps',
      name: newInvestment.name,
      amount: parseFloat(newInvestment.amount),
      currentValue: parseFloat(newInvestment.amount),
      expectedReturn: parseFloat(newInvestment.expectedReturn),
      stepUpAmount: newInvestment.stepUp ? parseFloat(newInvestment.stepUpAmount) || 0 : undefined,
      icon: investmentTypes.find(t => t.value === newInvestment.type)?.icon || TrendingUp,
      stepUp: newInvestment.stepUp,
    };

    setInvestments([...investments, updatedInvestment]);
    setNewInvestment({
      type: "",
      name: "",
      amount: "",
      expectedReturn: "",
      stepUp: false,
      stepUpAmount: ""
    });
    setIsAddingInvestment(false);

    toast({
      title: "Investment Added",
      description: "Your investment has been added successfully."
    });
  };

  const handleDeleteInvestment = (id: number) => {
    setInvestments(investments.filter(inv => inv.id !== id));
    toast({
      title: "Investment Removed",
      description: "Investment has been removed from your portfolio."
    });
  };

  const totalInvestments = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalAnnualIncome = investments.reduce((sum, inv) => sum + calculateAnnualIncome(inv.amount, inv.expectedReturn), 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Investments
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your investment portfolio and track returns
          </p>
        </div>
        <Button onClick={() => setIsAddingInvestment(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Investment
        </Button>
      </div>

      {/* Investment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border border-border/50 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalInvestments.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border border-border/50 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expected Annual Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">₹{totalAnnualIncome.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border border-border/50 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">
              {totalInvestments > 0 ? ((totalAnnualIncome / totalInvestments) * 100).toFixed(1) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Types Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Options</CardTitle>
          <CardDescription>Choose from various investment instruments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {investmentTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <Card key={type.value} className="text-center hover:shadow-card transition-all">
                  <CardContent className="p-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{type.label}</h3>
                    <p className="text-xs text-muted-foreground">Returns: {type.avgReturn}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Investment List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Investments</CardTitle>
          <CardDescription>Track and manage your investment portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investments.map((investment) => {
              const IconComponent = investment.icon;
              return (
                <div
                  key={investment.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{investment.name}</h3>
                      <p className="text-sm text-muted-foreground">{investment.type}</p>
                      {investment.stepUp && (
                        <Badge variant="secondary" className="mt-1">
                          Step-up: ₹{investment.stepUpAmount}/month
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{investment.amount.toLocaleString()}</p>
                    <p className="text-sm text-success">
                      {investment.expectedReturn}% • ₹{calculateAnnualIncome(investment.amount, investment.expectedReturn).toLocaleString()}/yr
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteInvestment(investment.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add Investment Modal */}
      {isAddingInvestment && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Investment</CardTitle>
            <CardDescription>Add a new investment to your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="investmentType">Investment Type</Label>
                  <Select value={newInvestment.type} onValueChange={(value) => setNewInvestment({...newInvestment, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select investment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {investmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investmentName">Investment Name</Label>
                  <Input
                    id="investmentName"
                    placeholder="e.g., HDFC Top 100 Fund"
                    value={newInvestment.name}
                    onChange={(e) => setNewInvestment({...newInvestment, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="investmentAmount">Investment Amount (₹)</Label>
                  <Input
                    id="investmentAmount"
                    type="number"
                    placeholder="100000"
                    value={newInvestment.amount}
                    onChange={(e) => setNewInvestment({...newInvestment, amount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedReturn">Expected Return (%)</Label>
                  <Input
                    id="expectedReturn"
                    type="number"
                    placeholder="12"
                    value={newInvestment.expectedReturn}
                    onChange={(e) => setNewInvestment({...newInvestment, expectedReturn: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="stepUp"
                  checked={newInvestment.stepUp}
                  onCheckedChange={(checked) => setNewInvestment({...newInvestment, stepUp: checked})}
                />
                <Label htmlFor="stepUp">Enable Step-up Investment</Label>
              </div>

              {newInvestment.stepUp && (
                <div className="space-y-2">
                  <Label htmlFor="stepUpAmount">Monthly Step-up Amount (₹)</Label>
                  <Input
                    id="stepUpAmount"
                    type="number"
                    placeholder="1000"
                    value={newInvestment.stepUpAmount}
                    onChange={(e) => setNewInvestment({...newInvestment, stepUpAmount: e.target.value})}
                  />
                </div>
              )}

              <div className="flex space-x-2">
                <Button onClick={handleAddInvestment}>Add Investment</Button>
                <Button variant="outline" onClick={() => setIsAddingInvestment(false)}>
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

export default InvestmentsPage;