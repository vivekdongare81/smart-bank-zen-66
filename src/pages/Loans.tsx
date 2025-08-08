import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Car, GraduationCap, Briefcase, Calculator } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getCurrentUser, addLoanApplication } from "@/lib/storage";

const LoansPage = () => {
  const [selectedLoan, setSelectedLoan] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const loanTypes = [
    {
      id: "home",
      name: "Home Loan",
      icon: Home,
      interestRate: "8.5% - 9.5%",
      maxAmount: "₹5 Crores",
      features: ["Up to 30 years tenure", "Pre-payment facility", "Tax benefits under 80C & 24B"],
      color: "from-blue-400 to-blue-600"
    },
    {
      id: "car",
      name: "Car Loan",
      icon: Car,
      interestRate: "7.5% - 8.5%",
      maxAmount: "₹1 Crore",
      features: ["Up to 7 years tenure", "Quick approval", "Minimal documentation"],
      color: "from-green-400 to-green-600"
    },
    {
      id: "education",
      name: "Education Loan",
      icon: GraduationCap,
      interestRate: "9.0% - 10.0%",
      maxAmount: "₹50 Lakhs",
      features: ["Moratorium period", "Collateral free up to ₹7.5L", "Tax benefits under 80E"],
      color: "from-purple-400 to-purple-600"
    },
    {
      id: "personal",
      name: "Personal Loan",
      icon: Briefcase,
      interestRate: "10.5% - 24.0%",
      maxAmount: "₹40 Lakhs",
      features: ["No collateral required", "Quick disbursal", "Flexible repayment"],
      color: "from-orange-400 to-orange-600"
    }
  ];

  const calculateEMI = () => {
    if (!loanAmount || !tenure || !selectedLoan) return 0;
    
    const selectedLoanType = loanTypes.find(loan => loan.id === selectedLoan);
    if (!selectedLoanType) return 0;
    
    const principal = parseFloat(loanAmount);
    const rate = 0.09 / 12; // Assuming 9% annual rate
    const months = parseInt(tenure) * 12;
    
    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    return Math.round(emi);
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to apply for a loan.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedLoan) {
      toast({
        title: "Please select a loan type",
        description: "Choose a loan type before applying.",
        variant: "destructive"
      });
      return;
    }

    setIsApplying(true);
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const amount = parseFloat(loanAmount);
    const tenureYears = parseInt(tenure);
    const emi = calculateEMI();
    
    const applicationData = {
      userId: currentUser.id,
      loanType: selectedLoan,
      fullName: formData.get('applicantName') as string,
      email: formData.get('applicantEmail') as string,
      phone: formData.get('applicantPhone') as string,
      pan: formData.get('applicantPan') as string,
      income: parseInt(formData.get('applicantIncome') as string),
      employment: formData.get('applicantEmployment') as string,
      purpose: formData.get('purpose') as string,
      amount: amount,
      tenure: tenureYears,
      emi: emi,
      status: 'pending' as const,
    };

    setTimeout(() => {
      addLoanApplication(applicationData);
      setIsApplying(false);
      toast({
        title: "Loan Application Submitted!",
        description: "Your loan application is being processed. Our team will contact you within 48 hours.",
      });
      
      // Reset form
      (e.target as HTMLFormElement).reset();
      setSelectedLoan("");
      setLoanAmount("");
      setTenure("");
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Loans
        </h1>
        <p className="text-muted-foreground mt-2">
          Find the perfect loan solution for your needs
        </p>
      </div>

      {/* Loan Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loanTypes.map((loan) => {
          const IconComponent = loan.icon;
          return (
            <Card 
              key={loan.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-elevated ${
                selectedLoan === loan.id ? 'ring-2 ring-primary shadow-elevated' : ''
              }`}
              onClick={() => setSelectedLoan(loan.id)}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${loan.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg">{loan.name}</CardTitle>
                <CardDescription>
                  <div className="text-sm font-semibold text-primary">
                    {loan.interestRate}
                  </div>
                  <div className="text-xs">
                    Up to {loan.maxAmount}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {loan.features.map((feature, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex items-start">
                      <div className="w-1 h-1 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* EMI Calculator */}
      {selectedLoan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>EMI Calculator</span>
            </CardTitle>
            <CardDescription>Calculate your estimated monthly payment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Loan Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="500000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenure">Tenure (Years)</Label>
                <Input
                  id="tenure"
                  type="number"
                  placeholder="10"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Estimated EMI</Label>
                <div className="flex items-center h-10 px-3 border border-border rounded-md bg-muted/50">
                  <span className="text-lg font-semibold text-primary">
                    ₹{calculateEMI().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Application Form */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Application</CardTitle>
          <CardDescription>
            Complete your loan application with the required details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleApply} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="applicantName">Full Name</Label>
                <Input id="applicantName" name="applicantName" placeholder="Enter your full name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applicantEmail">Email Address</Label>
                <Input id="applicantEmail" name="applicantEmail" type="email" placeholder="your@email.com" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="applicantPhone">Phone Number</Label>
                <Input id="applicantPhone" name="applicantPhone" type="tel" placeholder="+91 9876543210" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applicantPan">PAN Number</Label>
                <Input id="applicantPan" name="applicantPan" placeholder="ABCDE1234F" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="applicantIncome">Monthly Income</Label>
                <Input id="applicantIncome" name="applicantIncome" type="number" placeholder="50000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applicantEmployment">Employment Type</Label>
                <Select name="applicantEmployment" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="self-employed">Self Employed</SelectItem>
                    <SelectItem value="business">Business Owner</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Loan Purpose</Label>
              <Input id="purpose" name="purpose" placeholder="Describe the purpose of the loan" required />
            </div>

            <Button type="submit" className="w-full" disabled={isApplying}>
              {isApplying ? "Processing Application..." : "Apply for Loan"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoansPage;