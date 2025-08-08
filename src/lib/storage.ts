// Data storage utilities for SmartBank app
import { 
  dummyUsers, 
  dummyCreditCards, 
  dummyLoans, 
  dummyInvestments, 
  dummyGoals, 
  dummyTransactions, 
  dummyBudgetLimits 
} from '@/data/dummyData';
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
  profile?: UserProfile;
}

export interface UserProfile {
  dateOfBirth: string;
  address: string;
  pan: string;
  income: string;
  employment: string;
}

export interface CreditCardApplication {
  id: string;
  userId: string;
  cardType: string;
  fullName: string;
  email: string;
  phone: string;
  pan: string;
  income: string;
  employment: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

export interface LoanApplication {
  id: string;
  userId: string;
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

export interface Investment {
  id: string;
  userId: string;
  type: 'mutual-fund' | 'gold' | 'bonds' | 'eps' | 'nps';
  name: string;
  amount: number;
  currentValue: number;
  expectedReturn: number;
  stepUpAmount?: number;
  addedDate: string;
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
  createdDate: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface BudgetLimit {
  id: string;
  userId: string;
  category: string;
  limit: number;
  spent: number;
  month: string;
}

// Storage keys
const STORAGE_KEYS = {
  USER: 'smartbank_user',
  CREDIT_CARDS: 'smartbank_credit_cards',
  LOANS: 'smartbank_loans',
  INVESTMENTS: 'smartbank_investments',
  GOALS: 'smartbank_goals',
  TRANSACTIONS: 'smartbank_transactions',
  BUDGET_LIMITS: 'smartbank_budget_limits',
} as const;

// Initialize storage with dummy data on first load
const initializeStorage = () => {
  // Check if data already exists
  if (!localStorage.getItem(STORAGE_KEYS.USER)) {
    // Set a default logged-in user for demo
    setCurrentUser(dummyUsers[0] as any);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CREDIT_CARDS)) {
    localStorage.setItem(STORAGE_KEYS.CREDIT_CARDS, JSON.stringify(dummyCreditCards));
  }
  if (!localStorage.getItem(STORAGE_KEYS.LOANS)) {
    localStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(dummyLoans));
  }
  if (!localStorage.getItem(STORAGE_KEYS.INVESTMENTS)) {
    localStorage.setItem(STORAGE_KEYS.INVESTMENTS, JSON.stringify(dummyInvestments));
  }
  if (!localStorage.getItem(STORAGE_KEYS.GOALS)) {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(dummyGoals));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(dummyTransactions));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BUDGET_LIMITS)) {
    localStorage.setItem(STORAGE_KEYS.BUDGET_LIMITS, JSON.stringify(dummyBudgetLimits));
  }
};

// Initialize storage on module load
initializeStorage();

// Generic storage functions
export const getStorageData = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const setStorageData = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data to localStorage:', error);
  }
};

// User management
export const getCurrentUser = (): User | null => {
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
}

// Credit Cards
export const getCreditCardApplications = (): CreditCardApplication[] => 
  getStorageData<CreditCardApplication>(STORAGE_KEYS.CREDIT_CARDS);

export const addCreditCardApplication = (application: Omit<CreditCardApplication, 'id' | 'appliedDate'>): void => {
  const applications = getCreditCardApplications();
  const newApplication: CreditCardApplication = {
    ...application,
    id: Date.now().toString(),
    appliedDate: new Date().toISOString(),
  };
  applications.push(newApplication);
  setStorageData(STORAGE_KEYS.CREDIT_CARDS, applications);
};

// Loans
export const getLoanApplications = (): LoanApplication[] => 
  getStorageData<LoanApplication>(STORAGE_KEYS.LOANS);

export const addLoanApplication = (application: Omit<LoanApplication, 'id' | 'appliedDate'>): void => {
  const applications = getLoanApplications();
  const newApplication: LoanApplication = {
    ...application,
    id: Date.now().toString(),
    appliedDate: new Date().toISOString(),
  };
  applications.push(newApplication);
  setStorageData(STORAGE_KEYS.LOANS, applications);
};

// Investments
export const getInvestments = (): Investment[] => 
  getStorageData<Investment>(STORAGE_KEYS.INVESTMENTS);

export const addInvestment = (investment: Omit<Investment, 'id' | 'addedDate'>): void => {
  const investments = getInvestments();
  const newInvestment: Investment = {
    ...investment,
    id: Date.now().toString(),
    addedDate: new Date().toISOString(),
  };
  investments.push(newInvestment);
  setStorageData(STORAGE_KEYS.INVESTMENTS, investments);
};

export const updateInvestment = (id: string, updates: Partial<Investment>): void => {
  const investments = getInvestments();
  const index = investments.findIndex(inv => inv.id === id);
  if (index !== -1) {
    investments[index] = { ...investments[index], ...updates };
    setStorageData(STORAGE_KEYS.INVESTMENTS, investments);
  }
};

// Goals
export const getGoals = (): Goal[] => 
  getStorageData<Goal>(STORAGE_KEYS.GOALS);

export const addGoal = (goal: Omit<Goal, 'id' | 'createdDate'>): void => {
  const goals = getGoals();
  const newGoal: Goal = {
    ...goal,
    id: Date.now().toString(),
    createdDate: new Date().toISOString(),
  };
  goals.push(newGoal);
  setStorageData(STORAGE_KEYS.GOALS, goals);
};

export const updateGoal = (id: string, updates: Partial<Goal>): void => {
  const goals = getGoals();
  const index = goals.findIndex(goal => goal.id === id);
  if (index !== -1) {
    goals[index] = { ...goals[index], ...updates };
    setStorageData(STORAGE_KEYS.GOALS, goals);
  }
};

// Transactions
export const getTransactions = (): Transaction[] => 
  getStorageData<Transaction>(STORAGE_KEYS.TRANSACTIONS);

export const addTransaction = (transaction: Omit<Transaction, 'id'>): void => {
  const transactions = getTransactions();
  const newTransaction: Transaction = {
    ...transaction,
    id: Date.now().toString(),
  };
  transactions.push(newTransaction);
  setStorageData(STORAGE_KEYS.TRANSACTIONS, transactions);
};

// Budget Limits
export const getBudgetLimits = (): BudgetLimit[] => 
  getStorageData<BudgetLimit>(STORAGE_KEYS.BUDGET_LIMITS);

export const setBudgetLimit = (limit: Omit<BudgetLimit, 'id'>): void => {
  const limits = getBudgetLimits();
  const existingIndex = limits.findIndex(
    l => l.userId === limit.userId && l.category === limit.category && l.month === limit.month
  );
  
  if (existingIndex !== -1) {
    limits[existingIndex] = { ...limits[existingIndex], ...limit };
  } else {
    limits.push({
      ...limit,
      id: Date.now().toString(),
    });
  }
  setStorageData(STORAGE_KEYS.BUDGET_LIMITS, limits);
};

// Utility functions
export const generateId = (): string => Date.now().toString();

export const getCurrentMonth = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
};