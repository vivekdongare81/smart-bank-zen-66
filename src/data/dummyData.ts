// Dummy data for SmartBank App
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  monthlyIncome: number;
  employmentType: string;
  company: string;
  experience: number;
  panCard: string;
  aadharCard: string;
  createdAt: string;
}

export interface CreditCard {
  id: string;
  userId: string;
  cardType: string;
  annualIncome: number;
  employmentType: string;
  existingCards: number;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  approvedLimit?: number;
  cardNumber?: string;
  expiryDate?: string;
}

export interface Loan {
  id: string;
  userId: string;
  loanType: string;
  amount: number;
  tenure: number;
  monthlyIncome: number;
  employmentType: string;
  existingEMIs: number;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  interestRate?: number;
  monthlyEMI?: number;
  approvedAmount?: number;
}

export interface Investment {
  id: string;
  userId: string;
  type: 'mutual_fund' | 'gold' | 'bonds' | 'eps' | 'nps';
  name: string;
  amount: number;
  sipAmount?: number;
  stepUpPercentage?: number;
  expectedReturn: number;
  investedAt: string;
  currentValue: number;
  maturityDate?: string;
}

export interface Goal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  allocationPercentage: number;
  monthlyContribution: number;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
  paymentMethod: string;
}

export interface BudgetLimit {
  id: string;
  userId: string;
  category: string;
  limit: number;
  spent: number;
  month: string;
}

// Dummy Users
export const dummyUsers: User[] = [
  {
    id: "user1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91-9876543210",
    dateOfBirth: "1990-05-15",
    address: "123 MG Road, Bangalore, Karnataka 560001",
    monthlyIncome: 75000,
    employmentType: "salaried",
    company: "TCS",
    experience: 5,
    panCard: "ABCDE1234F",
    aadharCard: "1234-5678-9012",
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "user2",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91-9876543211",
    dateOfBirth: "1992-08-22",
    address: "456 CP Road, Delhi, Delhi 110001",
    monthlyIncome: 95000,
    employmentType: "salaried",
    company: "Infosys",
    experience: 4,
    panCard: "FGHIJ5678K",
    aadharCard: "5678-9012-3456",
    createdAt: "2024-02-10T14:20:00Z"
  }
];

// Dummy Credit Cards
export const dummyCreditCards: CreditCard[] = [
  {
    id: "cc1",
    userId: "user1",
    cardType: "platinum",
    annualIncome: 900000,
    employmentType: "salaried",
    existingCards: 1,
    status: "approved",
    appliedAt: "2024-03-01T09:00:00Z",
    approvedLimit: 200000,
    cardNumber: "4532-****-****-1234",
    expiryDate: "03/29"
  },
  {
    id: "cc2",
    userId: "user2",
    cardType: "gold",
    annualIncome: 1140000,
    employmentType: "salaried",
    existingCards: 0,
    status: "pending",
    appliedAt: "2024-07-15T11:30:00Z"
  }
];

// Dummy Loans
export const dummyLoans: Loan[] = [
  {
    id: "loan1",
    userId: "user1",
    loanType: "home",
    amount: 2500000,
    tenure: 240,
    monthlyIncome: 75000,
    employmentType: "salaried",
    existingEMIs: 5000,
    status: "approved",
    appliedAt: "2024-02-15T10:00:00Z",
    interestRate: 8.5,
    monthlyEMI: 19251,
    approvedAmount: 2500000
  },
  {
    id: "loan2",
    userId: "user2",
    loanType: "car",
    amount: 800000,
    tenure: 60,
    monthlyIncome: 95000,
    employmentType: "salaried",
    existingEMIs: 0,
    status: "pending",
    appliedAt: "2024-07-20T15:45:00Z"
  }
];

// Dummy Investments
export const dummyInvestments: Investment[] = [
  {
    id: "inv1",
    userId: "user1",
    type: "mutual_fund",
    name: "SBI Blue Chip Fund",
    amount: 50000,
    sipAmount: 5000,
    stepUpPercentage: 10,
    expectedReturn: 12,
    investedAt: "2024-01-01T00:00:00Z",
    currentValue: 55500,
    maturityDate: "2029-01-01T00:00:00Z"
  },
  {
    id: "inv2",
    userId: "user1",
    type: "gold",
    name: "Digital Gold",
    amount: 25000,
    expectedReturn: 8,
    investedAt: "2024-03-15T00:00:00Z",
    currentValue: 26200
  },
  {
    id: "inv3",
    userId: "user1",
    type: "nps",
    name: "NPS Tier 1",
    amount: 30000,
    sipAmount: 2000,
    expectedReturn: 10,
    investedAt: "2024-02-01T00:00:00Z",
    currentValue: 32100,
    maturityDate: "2050-12-31T00:00:00Z"
  },
  {
    id: "inv4",
    userId: "user2",
    type: "mutual_fund",
    name: "HDFC Top 100 Fund",
    amount: 75000,
    sipAmount: 8000,
    stepUpPercentage: 15,
    expectedReturn: 14,
    investedAt: "2024-02-01T00:00:00Z",
    currentValue: 82300
  }
];

// Dummy Goals
export const dummyGoals: Goal[] = [
  {
    id: "goal1",
    userId: "user1",
    name: "Emergency Fund",
    targetAmount: 450000,
    currentAmount: 125000,
    deadline: "2025-12-31T00:00:00Z",
    category: "General",
    priority: "high",
    createdAt: "2024-01-15T00:00:00Z",
    allocationPercentage: 40,
    monthlyContribution: 8000
  },
  {
    id: "goal2",
    userId: "user1",
    name: "Car Purchase",
    targetAmount: 800000,
    currentAmount: 180000,
    deadline: "2026-06-30T00:00:00Z",
    category: "Car",
    priority: "medium",
    createdAt: "2024-02-01T00:00:00Z",
    allocationPercentage: 35,
    monthlyContribution: 7000
  },
  {
    id: "goal3",
    userId: "user1",
    name: "Europe Trip",
    targetAmount: 300000,
    currentAmount: 45000,
    deadline: "2025-08-15T00:00:00Z",
    category: "Travel",
    priority: "low",
    createdAt: "2024-03-10T00:00:00Z",
    allocationPercentage: 25,
    monthlyContribution: 5000
  },
  {
    id: "goal4",
    userId: "user2",
    name: "Child Education",
    targetAmount: 1500000,
    currentAmount: 285000,
    deadline: "2029-12-31T00:00:00Z",
    category: "Education",
    priority: "high",
    createdAt: "2024-02-10T00:00:00Z",
    allocationPercentage: 50,
    monthlyContribution: 15000
  }
];

// Dummy Transactions
export const dummyTransactions: Transaction[] = [
  {
    id: "txn1",
    userId: "user1",
    amount: 75000,
    type: "income",
    category: "Salary",
    description: "Monthly Salary",
    date: "2024-07-01T00:00:00Z",
    paymentMethod: "Bank Transfer"
  },
  {
    id: "txn2",
    userId: "user1",
    amount: 25000,
    type: "expense",
    category: "Rent",
    description: "Monthly Rent",
    date: "2024-07-02T00:00:00Z",
    paymentMethod: "UPI"
  },
  {
    id: "txn3",
    userId: "user1",
    amount: 8000,
    type: "expense",
    category: "Food",
    description: "Groceries and Dining",
    date: "2024-07-05T00:00:00Z",
    paymentMethod: "Credit Card"
  },
  {
    id: "txn4",
    userId: "user1",
    amount: 3500,
    type: "expense",
    category: "Transportation",
    description: "Fuel and Auto",
    date: "2024-07-07T00:00:00Z",
    paymentMethod: "Debit Card"
  },
  {
    id: "txn5",
    userId: "user1",
    amount: 2000,
    type: "expense",
    category: "Entertainment",
    description: "Movie and Coffee",
    date: "2024-07-10T00:00:00Z",
    paymentMethod: "UPI"
  },
  {
    id: "txn6",
    userId: "user1",
    amount: 20000,
    type: "expense",
    category: "Investments",
    description: "SIP and NPS",
    date: "2024-07-01T00:00:00Z",
    paymentMethod: "Auto Debit"
  },
  {
    id: "txn7",
    userId: "user2",
    amount: 95000,
    type: "income",
    category: "Salary",
    description: "Monthly Salary",
    date: "2024-07-01T00:00:00Z",
    paymentMethod: "Bank Transfer"
  },
  {
    id: "txn8",
    userId: "user2",
    amount: 30000,
    type: "expense",
    category: "Rent",
    description: "Monthly Rent",
    date: "2024-07-02T00:00:00Z",
    paymentMethod: "UPI"
  }
];

// Dummy Budget Limits
export const dummyBudgetLimits: BudgetLimit[] = [
  {
    id: "budget1",
    userId: "user1",
    category: "Food",
    limit: 12000,
    spent: 8000,
    month: "2024-07"
  },
  {
    id: "budget2",
    userId: "user1",
    category: "Transportation",
    limit: 5000,
    spent: 3500,
    month: "2024-07"
  },
  {
    id: "budget3",
    userId: "user1",
    category: "Entertainment",
    limit: 4000,
    spent: 2000,
    month: "2024-07"
  },
  {
    id: "budget4",
    userId: "user1",
    category: "Shopping",
    limit: 8000,
    spent: 1500,
    month: "2024-07"
  },
  {
    id: "budget5",
    userId: "user2",
    category: "Food",
    limit: 15000,
    spent: 9500,
    month: "2024-07"
  },
  {
    id: "budget6",
    userId: "user2",
    category: "Transportation",
    limit: 7000,
    spent: 4200,
    month: "2024-07"
  }
];

// Goal Allocation Math Functions
export const calculateGoalProgress = (current: number, target: number): number => {
  return Math.min((current / target) * 100, 100);
};

export const calculateMonthsToGoal = (
  targetAmount: number,
  currentAmount: number,
  monthlyContribution: number,
  expectedReturn: number = 12
): number => {
  if (monthlyContribution === 0) return Infinity;
  
  const monthlyRate = expectedReturn / 12 / 100;
  const remainingAmount = targetAmount - currentAmount;
  
  if (remainingAmount <= 0) return 0;
  
  // Using FV of annuity formula to calculate time
  const months = Math.log(1 + (remainingAmount * monthlyRate) / monthlyContribution) / Math.log(1 + monthlyRate);
  return Math.ceil(months);
};

export const calculateGoalFeasibility = (
  targetAmount: number,
  currentAmount: number,
  monthlyContribution: number,
  timeFrameMonths: number,
  expectedReturn: number = 12
): {
  isAchievable: boolean;
  projectedAmount: number;
  shortfall: number;
  requiredMonthlyContribution: number;
} => {
  const monthlyRate = expectedReturn / 12 / 100;
  
  // Calculate future value of current amount
  const futureValueCurrent = currentAmount * Math.pow(1 + monthlyRate, timeFrameMonths);
  
  // Calculate future value of monthly contributions
  const futureValueSIP = monthlyContribution * (((Math.pow(1 + monthlyRate, timeFrameMonths) - 1) / monthlyRate) || timeFrameMonths);
  
  const projectedAmount = futureValueCurrent + futureValueSIP;
  const shortfall = Math.max(0, targetAmount - projectedAmount);
  
  // Calculate required monthly contribution to meet the goal
  const remainingTarget = targetAmount - futureValueCurrent;
  const requiredMonthlyContribution = remainingTarget / (((Math.pow(1 + monthlyRate, timeFrameMonths) - 1) / monthlyRate) || timeFrameMonths);
  
  return {
    isAchievable: projectedAmount >= targetAmount,
    projectedAmount,
    shortfall,
    requiredMonthlyContribution: Math.max(0, requiredMonthlyContribution)
  };
};

// Surplus Calculation
export const calculateMonthlySurplus = (
  monthlyIncome: number,
  monthlyExpenses: number
): number => {
  return monthlyIncome - monthlyExpenses;
};

// EMI Calculator
export const calculateEMI = (
  principal: number,
  annualRate: number,
  tenureMonths: number
): number => {
  const monthlyRate = annualRate / 12 / 100;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
              (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
};

// Investment Growth Calculator
export const calculateInvestmentGrowth = (
  principal: number,
  sipAmount: number,
  annualReturn: number,
  years: number,
  stepUpPercentage: number = 0
): {
  maturityAmount: number;
  totalInvested: number;
  totalReturns: number;
} => {
  const monthlyRate = annualReturn / 12 / 100;
  const totalMonths = years * 12;
  
  let totalInvested = principal;
  let maturityAmount = principal * Math.pow(1 + monthlyRate, totalMonths);
  
  // Calculate SIP with step-up
  let currentSIP = sipAmount;
  let yearlyInvestment = 0;
  
  for (let year = 1; year <= years; year++) {
    yearlyInvestment = currentSIP * 12;
    totalInvested += yearlyInvestment;
    
    // Calculate FV of this year's SIP
    const remainingMonths = (years - year + 1) * 12;
    const yearSIPFV = currentSIP * (((Math.pow(1 + monthlyRate, remainingMonths) - 1) / monthlyRate) || remainingMonths);
    maturityAmount += yearSIPFV;
    
    // Apply step-up for next year
    currentSIP = currentSIP * (1 + stepUpPercentage / 100);
  }
  
  return {
    maturityAmount: Math.round(maturityAmount),
    totalInvested: Math.round(totalInvested),
    totalReturns: Math.round(maturityAmount - totalInvested)
  };
};