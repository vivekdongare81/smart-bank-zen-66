import { Home, Car, GraduationCap, Briefcase } from "lucide-react";

export interface LoanType {
  id: string;
  name: string;
  icon: typeof Home;
  interestRate: string;
  maxAmount: string;
  features: string[];
  color: string;
}

export const loanTypes: LoanType[] = [
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

export interface LoanApplication {
  id: string;
  loanType: string;
  fullName: string;
  email: string;
  phone: string;
  pan: string;
  income: number;
  employment: string;
  purpose: string;
  amount: number;
  tenure: number;
  emi: number;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

export const loanApplications: LoanApplication[] = [
  {
    id: "loan1",
    loanType: "home",
    fullName: "Raj Kumar",
    email: "raj@example.com",
    phone: "+91 9876543210",
    pan: "ABCDE1234F",
    income: 85000,
    employment: "salaried",
    purpose: "Purchase new home",
    amount: 2500000,
    tenure: 20,
    emi: 25032,
    status: "approved",
    appliedDate: "2024-01-10"
  }
];